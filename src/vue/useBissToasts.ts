import { readonly, ref } from "vue";
import type { BissTone } from "../types";

export interface BissToast {
  id: number;
  tone: BissTone;
  title: string;
  copy?: string;
  /** Milliseconds before auto-dismiss. 0 keeps the toast until dismissed. */
  timeout: number;
}

const toasts = ref<BissToast[]>([]);
let nextId = 1;

function dismiss(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

function push(title: string, options: { tone?: BissTone; copy?: string; timeout?: number } = {}) {
  const tone = options.tone || "neutral";
  const id = nextId++;
  const timeout = options.timeout ?? (tone === "danger" ? 0 : 4200);
  toasts.value = [...toasts.value, { id, tone, title, copy: options.copy, timeout }];
  if (timeout > 0) setTimeout(() => dismiss(id), timeout);
  return id;
}

/** App-wide toast queue. State is module level so any component can publish. */
export function useBissToasts() {
  return {
    toasts: readonly(toasts),
    dismiss,
    push,
    success: (title: string, copy?: string) => push(title, { tone: "success", copy }),
    error: (title: string, copy?: string) => push(title, { tone: "danger", copy }),
    warning: (title: string, copy?: string) => push(title, { tone: "warning", copy }),
    clear: () => {
      toasts.value = [];
    },
  };
}
