import { EffectScope } from "vue"
import type { Ref } from "vue"

type Fn = (...args: any[]) => any

export const useScope = <T extends Fn>(
  func: T,
  { enabled = ref(true) } = {}
) => {
  let state: Ref<ReturnType<T> | null> = ref(null)
  let scope: EffectScope

  const dispose = () => {
    scope && scope.stop()
    state.value = null
  }

  watch(
    enabled,
    () => {
      if (enabled.value) {
        scope = effectScope()
        state.value = scope.run(() => func())
      } else {
        dispose()
      }
    },
    { immediate: true }
  )

  onScopeDispose(dispose)

  return { state, dispose }
}
