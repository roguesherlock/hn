import { EffectScope } from "vue"

export const useScope = (func: () => void, { enabled = ref(true) }) => {
  let state
  let scope: EffectScope

  const dispose = () => {
    scope && scope.stop()
    state = null
  }

  watch(
    enabled,
    () => {
      if (enabled.value) {
        scope = effectScope()
        console.log("running")
        state = scope.run(() => func())
      } else {
        dispose()
      }
    },
    { immediate: true }
  )

  onScopeDispose(dispose)

  return dispose
}
