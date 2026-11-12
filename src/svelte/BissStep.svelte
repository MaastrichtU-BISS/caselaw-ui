<script lang="ts">
  /**
   * One step of a setup sequence.
   *
   * `done` marks it satisfied; `current` marks the one to do next. Both are
   * the caller's judgement rather than something derived from position,
   * because "what is still missing" is usually read from live state — a secret
   * that exists, a manifest that has arrived — not from how far a wizard has
   * walked.
   */
  export let index: number | string;
  export let title: string;
  export let copy: string | undefined = undefined;
  export let done = false;
  export let current = false;
</script>

<li class="biss-step" class:is-done={done} class:is-current={current && !done}>
  <div class="biss-step-rail" aria-hidden="true">
    <span class="biss-step-marker">
      <slot name="marker">{done ? "✓" : index}</slot>
    </span>
    <span class="biss-step-line"></span>
  </div>
  <div class="biss-step-body">
    <p class="biss-step-title">{title}</p>
    {#if copy}
      <p class="biss-step-copy">{copy}</p>
    {/if}
    {#if $$slots.default}
      <div class="biss-step-content">
        <slot />
      </div>
    {/if}
  </div>
</li>
