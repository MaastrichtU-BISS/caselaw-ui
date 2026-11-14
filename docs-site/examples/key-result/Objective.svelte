<script lang="ts">
  import {
    BissKeyResult,
    type BissConfidence,
    type BissKeyResultCheckin,
    type BissKeyResultFormat,
    type BissKeyResultLastCheckin,
  } from 'biss-ui/svelte';

  interface Kr {
    id: string;
    title: string;
    owner: string;
    start: number;
    current: number;
    target: number;
    unit?: string;
    format?: BissKeyResultFormat;
    expected?: number;
    confidence?: BissConfidence;
    lastCheckin?: BissKeyResultLastCheckin;
    open: boolean;
  }
  let results = $state<Kr[]>([
    {
      id: 'papers',
      open: false,
      title: 'Publish peer-reviewed articles from Open justice',
      owner: 'Ada Lovelace',
      start: 0,
      current: 5,
      target: 12,
      unit: 'articles',
      expected: 0.55,
      confidence: 'at-risk',
      lastCheckin: { time: '3 days ago', author: 'Ada Lovelace', note: 'Two manuscripts under review.' },
    },
    {
      id: 'funding',
      open: false,
      title: 'Secure external research funding',
      owner: 'Grace Hopper',
      start: 0,
      current: 720000,
      target: 1000000,
      format: 'currency',
      expected: 0.55,
      confidence: 'on-track',
      lastCheckin: { time: 'Last week', author: 'Grace Hopper' },
    },
    {
      id: 'turnaround',
      open: false,
      title: 'Reduce ethics review turnaround',
      owner: 'Alan Turing',
      start: 40,
      current: 34,
      target: 15,
      unit: 'days',
      expected: 0.55,
      confidence: 'off-track',
    },
  ]);

  function checkin(id: string, value: BissKeyResultCheckin) {
    // Store the check-in, then pass back the recalculated key result.
    results = results.map((kr) =>
      kr.id === id
        ? {
            ...kr,
            current: value.value,
            confidence: value.confidence,
            lastCheckin: { time: 'Just now', author: 'You', note: value.note || undefined },
            open: false,
          }
        : kr,
    );
  }
</script>

<section aria-labelledby="objective-title">
  <h2 id="objective-title" class="example-objective">Grow the impact of the research programme</h2>
  {#each results as kr (kr.id)}
    <BissKeyResult
      bind:open={kr.open}
      title={kr.title}
      owner={kr.owner}
      start={kr.start}
      current={kr.current}
      target={kr.target}
      unit={kr.unit}
      format={kr.format}
      expected={kr.expected}
      confidence={kr.confidence}
      lastCheckin={kr.lastCheckin}
      locale="en-GB"
      oncheckin={(value) => checkin(kr.id, value)}
    />
  {/each}
</section>

<style>
  .example-objective {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 600;
  }
</style>
