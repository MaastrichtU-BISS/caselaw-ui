<script lang="ts">
  import { highlight, inferLanguage } from '../core/highlight';

  interface Props {
    /**
     * A code sample with its own chrome: what it is on the left, copy on the
     * right. A bare <pre> leaves the reader working out which language they are
     * looking at and whether it can be copied.
     */
    code: string;
    /** Shown top-left. A language, a filename, or "Terminal". */
    label?: string | undefined;
    copyable?: boolean;
    /** Overrides detection. `plain` turns highlighting off. */
    language?: string | undefined;
  }

  let { code, label = undefined, copyable = true, language = undefined }: Props = $props();

  // Detected from the code's own shape first, then the label — an install
  // sample is labelled with its framework but is a shell command.
  let tokens = $derived(highlight(code, inferLanguage(code, language ?? label)));

  let copied = $state(false);
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

<div class="biss-code">
  {#if label || copyable}
    <div class="biss-code-header">
      <span class="biss-code-label">{label ?? ''}</span>
      {#if copyable}
        <button type="button" class="biss-code-copy" onclick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      {/if}
    </div>
  {/if}
  <pre class="biss-code-body">{#each tokens as token}<span class="biss-tok-{token.kind}"
        >{token.text}</span
      >{/each}</pre>
</div>
