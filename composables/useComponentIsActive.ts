export const useComponentIsActive = () => {
  const active = ref(false)
  onMounted(() => {
    active.value = true
  })
  onActivated(() => {
    active.value = true
  })
  onDeactivated(() => {
    active.value = false
  })
  return active
}
