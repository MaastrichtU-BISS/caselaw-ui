/**
 * Compile every Svelte component.
 *
 * `tsc --noEmit` does not look inside .svelte files, so nothing here was
 * checking them — CleGridShell had been shipping a template that cannot
 * compile under Svelte 5 (a `<svelte:fragment>` wrapped in an `{#if}`), and no
 * consumer noticed because nothing imports caselaw-ui/svelte yet.
 *
 * A compile check, not a type check: template errors are the class of mistake
 * that was actually getting through.
 */

import { compile } from "svelte/compiler";
import { readFileSync, readdirSync } from "node:fs";

let failed = 0;
for (const file of readdirSync(new URL("../src/svelte/", import.meta.url)).filter((f) => f.endsWith(".svelte"))) {
  const source = readFileSync(new URL(`../src/svelte/${file}`, import.meta.url), "utf8");
  try {
    const { warnings } = compile(source, { filename: file, generate: "client" });
    const real = warnings.filter((w) => !/unused-export-let|a11y_no_static_element/.test(w.code ?? ""));
    console.log(`${real.length ? "warn" : "ok  "}  ${file}${real.length ? " :: " + real.map((w) => w.code).join(", ") : ""}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL  ${file} :: ${error.message}`);
  }
}
process.exit(failed ? 1 : 0);
