/**
 * The highlighter, which is the one piece of real logic in this library.
 *
 * Most of these pin the ordering of the scan. A highlighter built from
 * independent regexes passes a demo and then colours the word "class" inside a
 * string, or ends a docstring on its own opening quotes — so those are the
 * cases asserted, not the happy path.
 */

import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { highlight, inferLanguage, type CleCodeToken } from "../src/highlight";

/** The concatenated text must always reproduce the input exactly. */
function roundTrip(tokens: CleCodeToken[]): string {
  return tokens.map((token) => token.text).join("");
}

function kindOf(tokens: CleCodeToken[], text: string): string | undefined {
  return tokens.find((token) => token.text === text)?.kind;
}

describe("inferLanguage", () => {
  test("an env file is recognised before any label is consulted", () => {
    const code = "ACCESS_SERVICE_URL=https://example.test\nREQUIRE_AUTH=true";
    // Labelled Python, because the tab is named for the framework.
    assert.equal(inferLanguage(code, "Flask"), "env");
  });

  test("a shell command wins over the framework label", () => {
    // The install tab is labelled "Flask" but the sample is a shell command;
    // trusting the label would colour it as Python.
    assert.equal(inferLanguage('pip install "caselaw-access[flask]"', "Flask"), "bash");
    assert.equal(inferLanguage("npm install caselaw-access", "Hono"), "bash");
  });

  test("framework labels map to their language", () => {
    assert.equal(inferLanguage("@protect('x')\ndef view(): ...", "Django"), "python");
    assert.equal(inferLanguage('import { protect } from "x";', "Fastify"), "ts");
  });

  test("an explicit hint beats every heuristic", () => {
    assert.equal(inferLanguage("pip install x", "python"), "python");
  });

  test("unknown input is left alone rather than guessed at", () => {
    assert.equal(inferLanguage("just some prose", "Mystery"), "plain");
  });
});

describe("highlight", () => {
  test("never loses or invents characters", () => {
    const samples: [string, Parameters<typeof highlight>[1]][] = [
      ["def f():\n    return 1  # done\n", "python"],
      ["const x = `a${b}c`; // hm\n", "ts"],
      ["KEY=value\n# note\n", "env"],
      ['{"a": 1, "b": null}', "json"],
    ];
    for (const [code, language] of samples) {
      assert.equal(roundTrip(highlight(code, language)), code, language);
    }
  });

  test("a keyword inside a string stays a string", () => {
    const tokens = highlight('x = "class import return"', "python");
    assert.equal(kindOf(tokens, '"class import return"'), "string");
    assert.ok(!tokens.some((t) => t.kind === "keyword" && t.text === "class"));
  });

  test("a quote inside a comment does not open a string", () => {
    const code = "# it's fine\nreturn 1";
    const tokens = highlight(code, "python");
    assert.equal(kindOf(tokens, "# it's fine"), "comment");
    assert.equal(kindOf(tokens, "return"), "keyword");
    assert.equal(roundTrip(tokens), code);
  });

  test("a comment marker inside a string is not a comment", () => {
    const tokens = highlight('url = "https://x/#frag"', "python");
    assert.equal(kindOf(tokens, '"https://x/#frag"'), "string");
    assert.ok(!tokens.some((t) => t.kind === "comment"));
  });

  test("a docstring is one token, not two empty strings", () => {
    const code = '"""Guard a route.\n\nMore words.\n"""';
    const tokens = highlight(code, "python");
    assert.equal(tokens.length, 1);
    assert.equal(tokens[0]!.kind, "string");
    assert.equal(tokens[0]!.text, code);
  });

  test("an escaped quote does not end the string", () => {
    const tokens = highlight('x = "a\\"b" + y', "ts");
    assert.equal(kindOf(tokens, '"a\\"b"'), "string");
  });

  test("an unterminated quote is contained to its line", () => {
    // A typo should not swallow the rest of the file as a string.
    const code = "x = 'oops\nreturn 1";
    const tokens = highlight(code, "python");
    assert.equal(roundTrip(tokens), code);
    assert.equal(kindOf(tokens, "return"), "keyword");
  });

  test("decorators are marked, and only at the start of a line", () => {
    const tokens = highlight('@protect("search")\nx = a @ b', "python");
    assert.equal(kindOf(tokens, "@protect"), "decorator");
    assert.ok(!tokens.some((t) => t.kind === "decorator" && t.text === "@ b"));
  });

  test("env keys are marked but their values are not", () => {
    const tokens = highlight("ACCESS_PROJECT=citations-api", "env");
    assert.equal(kindOf(tokens, "ACCESS_PROJECT"), "key");
    assert.equal(roundTrip(tokens), "ACCESS_PROJECT=citations-api");
  });

  test("a number inside an identifier is not a number", () => {
    const tokens = highlight("sha256 = 1", "ts");
    assert.ok(!tokens.some((t) => t.kind === "number" && t.text === "256"));
    assert.equal(kindOf(tokens, "1"), "number");
  });

  test("plain returns a single token, so nothing is mangled", () => {
    const code = "anything at all <script>";
    assert.deepEqual(highlight(code, "plain"), [{ text: code, kind: "plain" }]);
  });
});
