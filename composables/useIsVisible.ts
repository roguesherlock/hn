import { ref, onMounted, onUnmounted, watch, nextTick } from "vue"
import type { Ref } from "vue"

export const useIsVisible = (itemSelector: Ref<string>) => {
  const isVisible = ref(true)
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true
      } else {
        isVisible.value = false
      }
    })
  }
  const observer = ref<IntersectionObserver>()
  onMounted(() => {
    const options = {
      root: document,
      rootMargin: "0px 0px 0px 0px",
      threshold: 1,
    }
    observer.value = new IntersectionObserver(callback, options)
    setTimeout(() => {
      const item = document.querySelector(itemSelector.value)
      if (item) {
        observer.value?.observe(item)
      }
    }, 300)
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  watch(itemSelector, (newSelector, prevSelector) => {
    if (prevSelector) {
      const prevItem = document.querySelector(prevSelector)
      if (prevItem) {
        observer.value?.unobserve(prevItem)
      }
    }
    if (newSelector) {
      nextTick(() => {
        setTimeout(() => {
          const item = document.querySelector(newSelector)
          if (item) {
            observer.value?.observe(item)
          }
        }, 300)
      })
    }
  })
  return isVisible
}
