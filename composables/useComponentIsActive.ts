export const useComponentIsActive = () => {
  const active = ref(false)
  onActivated(() => {
    active.value = true
  })
  onDeactivated(() => {
    active.value = false
  })
  return active
}
