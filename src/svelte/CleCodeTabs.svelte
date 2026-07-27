<script lang="ts">
  /**
   * The same instruction in several languages.
   *
   * One component rather than tabs-plus-code assembled per page, because the
   * pairing is always the same and getting it wrong — copy that copies the
   * inactive sample, tabs that do not survive a re-render — is easy and quiet.
   */
  import { highlight, inferLanguage } from "../highlight";
  import type { CleCodeSample } from "../types";

  export let samples: CleCodeSample[] = [];
  /**
   * Bindable, so a page showing the same choice in several blocks — install
   * here, guard there — can keep them in step.
   */
  export let activeIndex = 0;
  $: active = samples[activeIndex] ?? samples[0];
  $: tokens = active
    ? highlight(active.code, inferLanguage(active.code, active.language ?? active.label))
    : [];

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
  <pre class="cle-code-body">{#each tokens as token}<span class="cle-tok-{token.kind}">{token.text}</span>{/each}</pre>
</div>
