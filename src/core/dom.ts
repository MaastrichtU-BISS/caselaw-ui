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
      node.querySelector<HTMLElement>('[data-biss-autofocus]')?.focus();
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
/** Shared drag/keyboard resize behavior, with no listeners left after unmount. */
export function resizeHandle(
  node: HTMLElement,
  options: {
    value: number;
    min: number;
    max: number;
    percent?: boolean;
    onchange: (value: number) => void;
  },
) {
  let start = 0,
    value = 0,
    extent = 1;
  const move = (e: PointerEvent) =>
    options.onchange(
      Math.max(
        options.min,
        Math.min(options.max, value + (e.clientX - start) * (options.percent ? 100 / extent : 1)),
      ),
    );
  const up = () => {
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
  };
  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    start = e.clientX;
    value = options.value;
    extent = node.parentElement?.getBoundingClientRect().width ?? 1;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
    window.addEventListener('pointercancel', up, { once: true });
  };
  const key = (e: KeyboardEvent) => {
    const value =
      e.key === 'ArrowLeft'
        ? options.value - (options.percent ? 2 : 10)
        : e.key === 'ArrowRight'
          ? options.value + (options.percent ? 2 : 10)
          : e.key === 'Home'
            ? options.min
            : e.key === 'End'
              ? options.max
              : null;
    if (value !== null) {
      e.preventDefault();
      options.onchange(Math.max(options.min, Math.min(options.max, value)));
    }
  };
  node.addEventListener('pointerdown', down);
  node.addEventListener('keydown', key);
  return {
    update(next: typeof options) {
      options = next;
    },
    destroy() {
      up();
      node.removeEventListener('pointerdown', down);
      node.removeEventListener('keydown', key);
    },
  };
}

/** Hoverable, dismissible tooltip with focus persistence and one lifecycle in both frameworks. */
export function tooltip(node: HTMLButtonElement, options: { id: string }) {
  let tip: HTMLElement | null = null,
    timer: ReturnType<typeof setTimeout> | undefined,
    hover = false;
  const cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  const hide = () => {
    cancel();
    tip?.hidePopover();
  };
  const leave = () => {
    hover = false;
    cancel();
    timer = setTimeout(() => {
      if (!hover && node.ownerDocument.activeElement !== node) hide();
    }, 140);
  };
  const enter = () => {
    hover = true;
    cancel();
  };
  const show = () => {
    cancel();
    const next = node.ownerDocument.getElementById(options.id);
    if (next !== tip) {
      tip?.removeEventListener('mouseenter', enter);
      tip?.removeEventListener('mouseleave', leave);
      tip = next;
      tip?.addEventListener('mouseenter', enter);
      tip?.addEventListener('mouseleave', leave);
    }
    if (!tip) return;
    const r = node.getBoundingClientRect();
    tip.showPopover();
    tip.style.left = Math.max(8, Math.min(r.left, innerWidth - tip.offsetWidth - 8)) + 'px';
    tip.style.top =
      Math.max(
        8,
        r.bottom + 6 + tip.offsetHeight < innerHeight ? r.bottom + 6 : r.top - tip.offsetHeight - 6,
      ) + 'px';
  };
  const focus = () => show();
  const pointer = () => {
    hover = true;
    show();
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === 'Escape') hide();
  };
  node.addEventListener('mouseenter', pointer);
  node.addEventListener('mouseleave', leave);
  node.addEventListener('focus', focus);
  node.addEventListener('blur', leave);
  node.addEventListener('keydown', key);
  return {
    update(next: typeof options) {
      options = next;
    },
    destroy() {
      hide();
      node.removeEventListener('mouseenter', pointer);
      node.removeEventListener('mouseleave', leave);
      node.removeEventListener('focus', focus);
      node.removeEventListener('blur', leave);
      node.removeEventListener('keydown', key);
      tip?.removeEventListener('mouseenter', enter);
      tip?.removeEventListener('mouseleave', leave);
    },
  };
}
