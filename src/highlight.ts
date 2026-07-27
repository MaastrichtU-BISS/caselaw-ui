/**
 * A small syntax highlighter, shared by the Vue and Svelte code blocks.
 *
 * Deliberately not Shiki or highlight.js. This library has no runtime
 * dependencies, and the samples it renders are short and come from a handful
 * of languages — paying a megabyte and an async init to colour twelve lines of
 * `pip install` would be a bad trade for every consumer.
 *
 * It returns tokens rather than HTML. Emitting markup would mean escaping it
 * correctly at every call site, and one missed escape in a component that
 * renders whatever a page hands it is an injection bug. Tokens are rendered as
 * ordinary elements, so there is nothing to escape.
 *
 * The scan is single-pass and ordered — comments, then strings, then numbers,
 * then words — because that ordering is what stops a keyword inside a string
 * or a quote inside a comment from being treated as code. Highlighters
 * assembled from independent regexes get exactly that wrong.
 */

export type CleCodeLanguage = "python" | "ts" | "bash" | "env" | "json" | "plain";

export type CleTokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "builtin"
  | "decorator"
  | "key";

export interface CleCodeToken {
  text: string;
  kind: CleTokenKind;
}

const KEYWORDS: Record<string, readonly string[]> = {
  python: [
    "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del",
    "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in",
    "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while",
    "with", "yield",
  ],
  ts: [
    "as", "async", "await", "break", "case", "catch", "class", "const", "continue",
    "default", "delete", "do", "else", "export", "extends", "finally", "for", "from",
    "function", "if", "import", "in", "instanceof", "interface", "let", "new", "of",
    "return", "switch", "throw", "try", "type", "typeof", "var", "void", "while", "yield",
  ],
  bash: ["cd", "do", "done", "elif", "else", "export", "fi", "for", "if", "in", "then", "while"],
  json: [],
  env: [],
  plain: [],
};

const BUILTINS: Record<string, readonly string[]> = {
  python: ["False", "None", "True", "self", "cls", "print", "dict", "list", "str", "int"],
  ts: ["console", "null", "true", "false", "undefined", "this", "Response", "Request"],
  bash: ["npm", "pip", "node", "python", "python3", "git", "curl", "docker", "uv", "pnpm", "yarn"],
  json: ["true", "false", "null"],
  env: [],
  plain: [],
};

const LINE_COMMENT: Record<string, string | null> = {
  python: "#",
  bash: "#",
  env: "#",
  ts: "//",
  json: null,
  plain: null,
};

const WORD = /[A-Za-z_$][A-Za-z0-9_$]*/y;
const NUMBER = /\d[\d_]*(\.\d+)?([eE][+-]?\d+)?/y;

/** Which language a sample is, from an explicit hint, its shape, or its label. */
export function inferLanguage(code: string, hint?: string): CleCodeLanguage {
  const explicit = normalizeHint(hint);
  if (explicit) return explicit;

  const lines = code.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return "plain";

  // Checked before anything else: an .env file is all KEY=value, which would
  // otherwise be read as an expression in whatever language the label implies.
  if (lines.every((line) => line.startsWith("#") || /^[A-Z][A-Z0-9_]*=/.test(line))) return "env";

  // A shell sample is usually labelled with the framework it installs for, so
  // the label is the wrong signal and the command is the right one.
  const first = lines.find((line) => !line.startsWith("#")) ?? "";
  if (BUILTINS.bash.some((cmd) => first.startsWith(`${cmd} `))) return "bash";

  if (lines[0]!.startsWith("{") || lines[0]!.startsWith("[")) return "json";

  const label = labelLanguage(hint);
  if (label) return label;

  if (/^\s*(from|import|def|class|@)\s/m.test(code) && !code.includes(";")) return "python";
  if (/\b(const|import .* from|=>|function)\b/.test(code)) return "ts";
  return "plain";
}

function normalizeHint(hint?: string): CleCodeLanguage | null {
  const value = (hint || "").trim().toLowerCase();
  if (["python", "py"].includes(value)) return "python";
  if (["ts", "typescript", "js", "javascript", "node"].includes(value)) return "ts";
  if (["bash", "sh", "shell", "terminal", "console"].includes(value)) return "bash";
  if (["env", "dotenv"].includes(value)) return "env";
  if (value === "json") return "json";
  return null;
}

/** Framework labels, since a tab is usually named for the framework. */
function labelLanguage(hint?: string): CleCodeLanguage | null {
  const value = (hint || "").trim().toLowerCase();
  if (["flask", "fastapi", "django", "http.server", "starlette"].includes(value)) return "python";
  if (["express", "fastify", "koa", "hono", "next.js", "nextjs", "deno", "bun"].includes(value)) {
    return "ts";
  }
  return null;
}

export function highlight(code: string, language: CleCodeLanguage): CleCodeToken[] {
  if (language === "plain") return [{ text: code, kind: "plain" }];

  const tokens: CleCodeToken[] = [];
  const keywords = new Set(KEYWORDS[language] ?? []);
  const builtins = new Set(BUILTINS[language] ?? []);
  const comment = LINE_COMMENT[language] ?? null;
  let plain = "";

  const flush = () => {
    if (plain) {
      tokens.push({ text: plain, kind: "plain" });
      plain = "";
    }
  };
  const push = (text: string, kind: CleTokenKind) => {
    flush();
    tokens.push({ text, kind });
  };

  let i = 0;
  let atLineStart = true;

  while (i < code.length) {
    const rest = code.slice(i);

    if (comment && rest.startsWith(comment)) {
      const end = code.indexOf("\n", i);
      const stop = end === -1 ? code.length : end;
      push(code.slice(i, stop), "comment");
      i = stop;
      continue;
    }

    if (language === "ts" && rest.startsWith("/*")) {
      const end = code.indexOf("*/", i + 2);
      const stop = end === -1 ? code.length : end + 2;
      push(code.slice(i, stop), "comment");
      i = stop;
      continue;
    }

    const quote = code[i];
    if (quote === '"' || quote === "'" || (language === "ts" && quote === "`")) {
      // Triple quotes first, or the closing pair of """ would end the string
      // immediately and leave the body as code.
      const triple = language === "python" ? code.slice(i, i + 3) : "";
      if (triple === '"""' || triple === "'''") {
        const end = code.indexOf(triple, i + 3);
        const stop = end === -1 ? code.length : end + 3;
        push(code.slice(i, stop), "string");
        i = stop;
        continue;
      }
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === quote) {
          j += 1;
          break;
        }
        // An unterminated single-quoted string is a typo, not a multi-line
        // string; stopping at the newline keeps the damage to one line.
        if (code[j] === "\n" && quote !== "`") break;
        j += 1;
      }
      push(code.slice(i, j), "string");
      i = j;
      continue;
    }

    if (language === "python" && quote === "@" && atLineStart) {
      WORD.lastIndex = i + 1;
      const match = WORD.exec(code);
      if (match) {
        push(code.slice(i, WORD.lastIndex), "decorator");
        i = WORD.lastIndex;
        atLineStart = false;
        continue;
      }
    }

    if (language === "env" && atLineStart) {
      const match = /^([A-Z][A-Z0-9_]*)(=)/.exec(rest);
      if (match) {
        push(match[1]!, "key");
        plain += match[2]!;
        i += match[0]!.length;
        atLineStart = false;
        continue;
      }
    }

    NUMBER.lastIndex = i;
    const number = NUMBER.exec(code);
    if (number && /[^A-Za-z0-9_$]/.test(code[i - 1] ?? " ")) {
      push(number[0], "number");
      i = NUMBER.lastIndex;
      continue;
    }

    WORD.lastIndex = i;
    const word = WORD.exec(code);
    if (word) {
      const text = word[0];
      if (keywords.has(text)) push(text, "keyword");
      else if (builtins.has(text)) push(text, "builtin");
      else plain += text;
      i = WORD.lastIndex;
      atLineStart = false;
      continue;
    }

    const char = code[i]!;
    plain += char;
    if (char === "\n") atLineStart = true;
    else if (char !== " " && char !== "\t") atLineStart = false;
    i += 1;
  }

  flush();
  return tokens;
}
