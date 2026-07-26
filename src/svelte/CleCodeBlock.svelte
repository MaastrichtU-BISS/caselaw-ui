<script lang="ts">
  /**
   * A code sample with its own chrome: what it is on the left, copy on the
   * right. A bare <pre> leaves the reader working out which language they are
   * looking at and whether it can be copied.
   */
  export let code: string;
  /** Shown top-left. A language, a filename, or "Terminal". */
  export let label: string | undefined = undefined;
  export let copyable = true;

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
  <pre class="cle-code-body">{code}</pre>
</div>
