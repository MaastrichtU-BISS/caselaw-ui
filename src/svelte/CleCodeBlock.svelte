<script lang="ts">
  import { highlight, inferLanguage } from "../highlight";

  /**
   * A code sample with its own chrome: what it is on the left, copy on the
   * right. A bare <pre> leaves the reader working out which language they are
   * looking at and whether it can be copied.
   */
  export let code: string;
  /** Shown top-left. A language, a filename, or "Terminal". */
  export let label: string | undefined = undefined;
  export let copyable = true;
  /** Overrides detection. `plain` turns highlighting off. */
  export let language: string | undefined = undefined;

  // Detected from the code's own shape first, then the label — an install
  // sample is labelled with its framework but is a shell command.
  $: tokens = highlight(code, inferLanguage(code, language ?? label));

  let copied = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1800);
  }
</script>

<div class="cle-code">
  {#if label || copyable}
    <div class="cle-code-header">
      <span class="cle-code-label">{label ?? ""}</span>
      {#if copyable}
        <button type="button" class="cle-code-copy" on:click={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      {/if}
    </div>
  {/if}
  <pre class="cle-code-body">{#each tokens as token}<span class="cle-tok-{token.kind}">{token.text}</span>{/each}</pre>
</div>
