<script lang="ts">
  interface Props {
    /**
     * One step of a setup sequence.
     *
     * `done` marks it satisfied; `current` marks the one to do next. Both are
     * the caller's judgement rather than something derived from position,
     * because "what is still missing" is usually read from live state — a secret
     * that exists, a manifest that has arrived — not from how far a wizard has
     * walked.
     */
    index: number | string;
    title: string;
    copy?: string | undefined;
    done?: boolean;
    current?: boolean;
    marker?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  }

  let {
    index,
    title,
    copy = undefined,
    done = false,
    current = false,
    marker,
    children,
  }: Props = $props();
</script>

<li class="biss-step" class:is-done={done} class:is-current={current && !done}>
  <div class="biss-step-rail" aria-hidden="true">
    <span class="biss-step-marker">
      {#if marker}{@render marker()}{:else}{done ? '✓' : index}{/if}
    </span>
    <span class="biss-step-line"></span>
  </div>
  <div class="biss-step-body">
    <p class="biss-step-title">{title}</p>
    {#if copy}
      <p class="biss-step-copy">{copy}</p>
    {/if}
    {#if children}
      <div class="biss-step-content">
        {@render children?.()}
      </div>
    {/if}
  </div>
</li>
