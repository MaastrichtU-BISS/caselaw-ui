<script lang="ts">
  /**
   * The same instruction in several languages.
   *
   * One component rather than tabs-plus-code assembled per page, because the
   * pairing is always the same and getting it wrong — copy that copies the
   * inactive sample, tabs that do not survive a re-render — is easy and quiet.
   */
  import type { CleCodeSample } from "../types";

  export let samples: CleCodeSample[] = [];

  let activeIndex = 0;
  $: active = samples[activeIndex] ?? samples[0];

  let copied = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      // Reads through `active`, so it can never copy a hidden sample.
      await navigator.clipboard.writeText(active?.code ?? "");
    } catch {
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1800);
  }
</script>

<div class="cle-code">
  <div class="cle-code-header">
    <div class="cle-code-tablist" role="tablist">
      {#each samples as sample, index}
        <button
          type="button"
          role="tab"
          class="cle-code-tab"
          class:is-active={index === activeIndex}
          aria-selected={index === activeIndex}
          on:click={() => (activeIndex = index)}
        >
          {sample.label}
        </button>
      {/each}
    </div>
    <button type="button" class="cle-code-copy" on:click={copy}>
      {copied ? "Copied" : "Copy"}
    </button>
  </div>
  <pre class="cle-code-body">{active?.code ?? ""}</pre>
</div>
