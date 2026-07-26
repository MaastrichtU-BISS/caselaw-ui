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

<li class="cle-step" class:is-done={done} class:is-current={current && !done}>
  <div class="cle-step-rail" aria-hidden="true">
    <span class="cle-step-marker">
      <slot name="marker">{done ? "✓" : index}</slot>
    </span>
    <span class="cle-step-line"></span>
  </div>
  <div class="cle-step-body">
    <p class="cle-step-title">{title}</p>
    {#if copy}
      <p class="cle-step-copy">{copy}</p>
    {/if}
    {#if $$slots.default}
      <div class="cle-step-content">
        <slot />
      </div>
    {/if}
  </div>
</li>
