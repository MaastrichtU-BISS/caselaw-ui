import type { BissTone } from './types';
export interface BissToastMessage {
  id: number;
  title: string;
  copy?: string;
  tone: BissTone;
}
/** Each application owns its queue. No timers or state are created during SSR. */
export function createBissToasts() {
  let messages: BissToastMessage[] = [];
  let id = 0;
  const listeners = new Set<(value: BissToastMessage[]) => void>();
  const timers = new Map<number, ReturnType<typeof setTimeout>>();
  const notify = () => listeners.forEach((fn) => fn([...messages]));
  const dismiss = (key: number) => {
    clearTimeout(timers.get(key));
    timers.delete(key);
    messages = messages.filter((m) => m.id !== key);
    notify();
  };
  return {
    subscribe(fn: (value: BissToastMessage[]) => void) {
      listeners.add(fn);
      fn([...messages]);
      return () => {
        listeners.delete(fn);
      };
    },
    push(title: string, options: { copy?: string; tone?: BissTone; timeout?: number } = {}) {
      const key = ++id;
      messages = [
        ...messages,
        { id: key, title, copy: options.copy, tone: options.tone ?? 'neutral' },
      ];
      notify();
      if (typeof window !== 'undefined' && (options.timeout ?? 4200) > 0)
        timers.set(
          key,
          setTimeout(() => dismiss(key), options.timeout ?? 4200),
        );
      return key;
    },
    dismiss,
    destroy() {
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
      messages = [];
      listeners.clear();
    },
    clear() {
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
      messages = [];
      notify();
    },
  };
}
export type BissToastQueue = ReturnType<typeof createBissToasts>;
