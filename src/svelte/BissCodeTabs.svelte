<script lang="ts">
  /**
   * The same instruction in several languages.
   *
   * One component rather than tabs-plus-code assembled per page, because the
   * pairing is always the same and getting it wrong — copy that copies the
   * inactive sample, tabs that do not survive a re-render — is easy and quiet.
   */
  import { highlight, inferLanguage } from '../core/highlight';
  import type { BissCodeSample } from '../core/types';

  interface Props {
    samples?: BissCodeSample[];
    /**
     * Bindable, so a page showing the same choice in several blocks — install
     * here, guard there — can keep them in step.
     */
    activeIndex?: number;
  }

  let { samples = [], activeIndex = $bindable(0) }: Props = $props();
  let active = $derived(samples[activeIndex] ?? samples[0]);
  let tokens = $derived(
    active
      ? highlight(active.code, inferLanguage(active.code, active.language ?? active.label))
      : [],
  );

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copy() {
    try {
      // Reads through `active`, so it can never copy a hidden sample.
      await navigator.clipboard.writeText(active?.code ?? '');
    } catch {
      return;
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1800);
  }
</script>

<div class="biss-code">
  <div class="biss-code-header">
    <div class="biss-code-tablist" role="tablist">
      {#each samples as sample, index}
        <button
          type="button"
          role="tab"
          class="biss-code-tab"
          class:is-active={index === activeIndex}
          aria-selected={index === activeIndex}
          onclick={() => (activeIndex = index)}
        >
          {sample.label}
        </button>
      {/each}
    </div>
    <button type="button" class="biss-code-copy" onclick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  </div>
  <pre class="biss-code-body">{#each tokens as token}<span class="biss-tok-{token.kind}"
        >{token.text}</span
      >{/each}</pre>
</div>
