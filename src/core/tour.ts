/** Pure geometry and step logic for BissTour. No DOM access at import time. */

/** One stop of a tour. */
export interface BissTourStep {
  id: string;
  /** A CSS selector or an element. Without one, or when it is not on the page, the card is centered. */
  target?: string | HTMLElement | null;
  title: string;
  body?: string;
  /** Preferred side of the target; the card flips when there is no room. */
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export interface BissRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** Keep a step index inside the tour; an empty tour has no valid step (-1). */
export function clampStep(index: number, length: number): number {
  if (length <= 0) return -1;
  if (!Number.isFinite(index)) return 0;
  return Math.min(length - 1, Math.max(0, Math.trunc(index)));
}

/**
 * The spotlight hole around a target: the target grown by `padding`, then
 * clipped to the viewport so the cut-out never runs off screen. A target
 * entirely outside the viewport yields null.
 */
export function spotlightRect(
  target: BissRect,
  padding: number,
  viewport: { width: number; height: number },
): BissRect | null {
  const pad = Number.isFinite(padding) ? Math.max(0, padding) : 0;
  const top = Math.max(0, target.top - pad),
    left = Math.max(0, target.left - pad),
    bottom = Math.min(viewport.height, target.top + target.height + pad),
    right = Math.min(viewport.width, target.left + target.width + pad);
  if (bottom <= top || right <= left) return null;
  return { top, left, width: right - left, height: bottom - top };
}

/** Whether a target needs scrolling into view before it can be spotlit. */
export function needsScroll(
  target: BissRect,
  viewport: { width: number; height: number },
  margin = 16,
): boolean {
  return (
    target.top < margin ||
    target.top + target.height > viewport.height - margin ||
    target.left + target.width < 0 ||
    target.left > viewport.width
  );
}

/** A zero-size anchor for a step without a target: centered, a little above the middle. */
export function centerAnchor(viewport: { width: number; height: number }): BissRect {
  return { top: Math.round(viewport.height * 0.3), left: Math.round(viewport.width / 2), width: 0, height: 0 };
}

/** Find a step's target in the page: the first visible match of a selector, or the element itself. */
export function findTarget(
  target: BissTourStep['target'],
  root: Pick<Document, 'querySelectorAll'> | undefined = typeof document === 'undefined'
    ? undefined
    : document,
): HTMLElement | null {
  if (!target || !root) return null;
  if (typeof target !== 'string') return target.isConnected ? target : null;
  let nodes: HTMLElement[] = [];
  try {
    nodes = Array.from(root.querySelectorAll<HTMLElement>(target));
  } catch {
    return null;
  }
  return (
    nodes.find((node) => {
      const r = node.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }) ?? null
  );
}
