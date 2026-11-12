import {
  getCurrentInstance,
  inject,
  onScopeDispose,
  provide,
  readonly,
  ref,
  type App,
  type InjectionKey,
} from 'vue';
import { createBissToasts, type BissToastQueue, type BissToastMessage } from '../core/toasts';
function adapter(queue: BissToastQueue) {
  const toasts = ref<BissToastMessage[]>([]);
  const unsubscribe = queue.subscribe((value) => (toasts.value = value));
  return {
    toasts: readonly(toasts),
    push: queue.push,
    dismiss: queue.dismiss,
    clear: queue.clear,
    success: (title: string, copy?: string) => queue.push(title, { tone: 'success', copy }),
    error: (title: string, copy?: string) => queue.push(title, { tone: 'danger', copy }),
    warning: (title: string, copy?: string) => queue.push(title, { tone: 'warning', copy }),
    dispose() {
      unsubscribe();
      queue.destroy();
    },
  };
}
type ToastContext = ReturnType<typeof adapter>;
const key: InjectionKey<ToastContext> = Symbol('biss-ui-toasts');
/** Install once per application. SSR requests never share a queue. */
export function createBissUI(options: { toasts?: BissToastQueue } = {}) {
  return {
    install(app: App) {
      const context = adapter(options.toasts ?? createBissToasts());
      app.provide(key, context);
      app.onUnmount(context.dispose);
    },
  };
}
export function provideBissToasts(queue: BissToastQueue = createBissToasts()) {
  const context = adapter(queue);
  provide(key, context);
  onScopeDispose(context.dispose);
  return context;
}
export function useBissToasts(): ToastContext {
  const instance = getCurrentInstance();
  if (!instance)
    throw Error(
      'useBissToasts must run during component setup. Use createBissToasts for application services.',
    );
  const provided = inject(key, null);
  if (provided) return provided;
  const app = instance.appContext.app;
  const context = adapter(createBissToasts());
  app.provide(key, context);
  app.onUnmount(context.dispose);
  return context;
}
