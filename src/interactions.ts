/** Shared DOM lifecycle for both framework implementations. No DOM access during SSR. */
export function floatPanel(
  node: HTMLElement,
  options: {
    anchorId: string;
    align?: 'start' | 'end';
    width?: number;
    focus?: boolean;
    onopen?: () => void;
  },
) {
  const place = () => {
    const anchor = document.getElementById(options.anchorId);
    if (!anchor || !node.matches(':popover-open')) return;
    const r = anchor.getBoundingClientRect(),
      width = Math.min(options.width ?? 280, innerWidth - 16);
    node.style.width = `${width}px`;
    const h = node.offsetHeight;
    node.style.left = `${Math.max(8, Math.min(options.align === 'end' ? r.right - width : r.left, innerWidth - width - 8))}px`;
    node.style.top = `${r.bottom + 6 + h <= innerHeight - 8 ? r.bottom + 6 : Math.max(8, r.top - h - 6)}px`;
  };
  const keys = (e: KeyboardEvent) => listKeys(e, node);
  const before = (e: Event) => {
    if ((e as ToggleEvent).newState === 'open') options.onopen?.();
  };
  node.addEventListener('keydown', keys);
  node.addEventListener('beforetoggle', before);
  const toggle = (e: Event) => {
    if ((e as ToggleEvent).newState === 'open') {
      place();
      if (options.focus !== false && !node.contains(document.activeElement))
        (
          node.querySelector<HTMLElement>(
            '[autofocus],input,button:not(:disabled),[tabindex="0"]',
          ) ?? node
        ).focus({ preventScroll: true });
    }
  };
  node.addEventListener('toggle', toggle);
  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, true);
  return {
    update(next: typeof options) {
      options = next;
      place();
    },
    destroy() {
      node.removeEventListener('keydown', keys);
      node.removeEventListener('beforetoggle', before);
      node.removeEventListener('toggle', toggle);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    },
  };
}
export function closePopover(node: HTMLElement | null) {
  node?.hidePopover();
}
export function listKeys(event: KeyboardEvent, root: HTMLElement | null) {
  if (
    !root ||
    ((event.target as HTMLElement).matches('input') &&
      !['ArrowDown', 'ArrowUp'].includes(event.key))
  )
    return;
  const list = Array.from(
    root.querySelectorAll<HTMLElement>('[data-choice]:not(:disabled):not([aria-disabled="true"])'),
  );
  if (!list.length) return;
  const at = list.indexOf(document.activeElement as HTMLElement);
  const next =
    event.key === 'ArrowDown'
      ? (at + 1) % list.length
      : event.key === 'ArrowUp'
        ? (at - 1 + list.length) % list.length
        : event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? list.length - 1
            : -1;
  if (next >= 0) {
    event.preventDefault();
    list[next]?.focus();
  }
}
/** Synchronize a native modal without replacing its built-in inertness or focus trap. */
let scrollLocks = 0;
let previousOverflow = '';
export function modal(
  node: HTMLDialogElement,
  options: { open: boolean; onclose: () => void; busy?: boolean },
) {
  let previous: HTMLElement | null = null;
  let locked = false;
  const lock = () => {
    if (!locked) {
      if (scrollLocks++ === 0) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      locked = true;
    }
  };
  const unlock = () => {
    if (locked) {
      locked = false;
      if (--scrollLocks === 0) document.body.style.overflow = previousOverflow;
    }
  };
  const key = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const els = Array.from(
      node.querySelectorAll<HTMLElement>(
        'button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.getClientRects().length > 0);
    const first = els[0],
      last = els.at(-1);
    if (!first) {
      e.preventDefault();
      node.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const sync = () => {
    if (options.open && !node.open) {
      previous = document.activeElement as HTMLElement;
      node.showModal();
      lock();
    } else if (!options.open && node.open) {
      node.close();
      unlock();
    }
  };
  const cancel = (e: Event) => {
    e.preventDefault();
    if (!options.busy) options.onclose();
  };
  const click = (e: MouseEvent) => {
    if (e.target !== node || options.busy) return;
    const r = node.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      options.onclose();
  };
  const closed = () => {
    unlock();
    previous?.focus();
    if (options.open) options.onclose();
  };
  node.addEventListener('keydown', key);
  node.addEventListener('cancel', cancel);
  node.addEventListener('click', click);
  node.addEventListener('close', closed);
  sync();
  return {
    update(next: typeof options) {
      options = next;
      sync();
    },
    destroy() {
      node.removeEventListener('keydown', key);
      node.removeEventListener('cancel', cancel);
      node.removeEventListener('click', click);
      node.removeEventListener('close', closed);
      if (node.open) node.close();
      unlock();
      previous?.focus();
    },
  };
}

export function choiceKeys(node: HTMLElement) {
  const key = (e: KeyboardEvent) => listKeys(e, node);
  node.addEventListener('keydown', key);
  return {
    destroy() {
      node.removeEventListener('keydown', key);
    },
  };
}
