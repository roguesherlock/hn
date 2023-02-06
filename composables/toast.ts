import { storeToRefs, defineStore } from "pinia"

export type Toast = {
  id: number
  title: string
  description?: string
  type: "success" | "error" | "info"
  __paused?: boolean
  __timeout?: number
  __dismissed?: boolean
}

export const useToastStore = defineStore("toast", () => {
  const toasts = ref<Toast[]>([])

  function add(toast: Omit<Toast, "id">) {
    toasts.value.push({
      id: toasts.value.length + 1,
      title: toast.title,
      description: toast.description,
      type: toast.type,
      __timeout: new Date().getTime() + 5000,
      __dismissed: false,
    })
  }
  function dismiss(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function pauseTimer(id: number) {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast) {
      toast.__paused = true
    }
  }

  function startTimer(id: number) {
    const toast = toasts.value.find((t) => t.id === id)
    if (toast) {
      toast.__paused = false
      toast.__timeout = new Date().getTime() + 5000
    }
  }

  setInterval(() => {
    const time = new Date().getTime()
    toasts.value = toasts.value.filter((t) => {
      if (t.__paused) {
        return true
      }
      if (t.__dismissed) {
        return false
      }
      if (t.__timeout && t.__timeout > time) {
        return true
      }
      t.__dismissed = true
      return false
    })
  }, 1000)

  return { toasts, add, dismiss, pauseTimer, startTimer }
})

export const useToast = () => {
  const toastStore = useToastStore()
  const { add, dismiss, pauseTimer, startTimer } = toastStore
  const { toasts } = storeToRefs(toastStore)

  function success(title: string, description?: string) {
    add({ title, description, type: "success" })
  }

  function message(title: string, description?: string) {
    add({ title, description, type: "info" })
  }
  function error(title: string, description?: string) {
    add({ title, description, type: "error" })
  }

  return {
    toasts,
    add,
    success,
    message,
    error,
    dismiss,
    pauseTimer,
    startTimer,
  }
}
