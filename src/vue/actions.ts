import type { ObjectDirective } from 'vue';
/** Adapt cleanup-based shared DOM actions to Vue directives. */
export function actionDirective<T extends HTMLElement, P>(
  action: (node: T, options: P) => { update?: (options: P) => void; destroy: () => void },
): ObjectDirective<T, P> {
  const effects = new WeakMap<T, ReturnType<typeof action>>();
  return {
    mounted(node, binding) {
      effects.set(node, action(node, binding.value));
    },
    updated(node, binding) {
      effects.get(node)?.update?.(binding.value);
    },
    beforeUnmount(node) {
      effects.get(node)?.destroy();
      effects.delete(node);
    },
  };
}
