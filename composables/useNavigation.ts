import type { Ref } from "vue"
import { useMagicKeys } from "@vueuse/core"

export type useNavigationOptions = {
  scrollEl: Ref<HTMLElement | null>
  enabled: Ref<boolean>
}

export const useNavigation = ({ scrollEl, enabled }: useNavigationOptions) => {
  const scrolled = ref<Set<HTMLElement>>(new Set())
  const sortedScrolled = computed(() =>
    Array.from(scrolled.value).sort((a, b) => {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top
    })
  )

  const { j, k } = useMagicKeys()

  const scrollIntoView = (el?: HTMLElement | Element) => {
    if (!el) return
    const top = el.getBoundingClientRect().top
    window?.scrollTo({
      top: top + window.scrollY - 52,
      behavior: "smooth",
    })
  }

  const callback = (entries: IntersectionObserverEntry[]) => {
    // console.log("called")
    entries.forEach(entry => {
      const target = entry.target as HTMLElement
      const sibling = target.nextElementSibling
      if (entry.isIntersecting) {
        scrolled.value.add(target)
        if (sibling) scrolled.value.add(sibling as HTMLElement)
      } else {
        scrolled.value.delete(entry.target as HTMLElement)
        if (sibling) scrolled.value.delete(sibling as HTMLElement)
      }
    })
  }

  const observer = ref<IntersectionObserver>()
  const observeItems = () => {
    const options = {
      rootMargin: "0px",
      threshold: 0,
    }
    observer.value = new IntersectionObserver(callback, options)
    const el = scrollEl.value
    if (el && el.children.length > 0) {
      for (const child of el.children) {
        observer.value?.observe(child)
      }
    }
  }

  onDeactivated(() => {
    observer.value?.disconnect()
  })

  watch(
    enabled,
    value => {
      if (value) observeItems()
    },
    {
      immediate: true,
    }
  )

  watch(j, value => {
    if (value) scrollToNext()
  })

  watch(k, value => {
    if (value) scrollToPrev()
  })

  const scrollToPrev = () => {
    let didScroll = false

    for (const el of sortedScrolled.value) {
      if (el.getBoundingClientRect().top < 52) {
        scrollIntoView(el)
        el.focus?.()
        didScroll = true
        break
      }
    }
    if (!didScroll) {
      const prev = sortedScrolled.value[0]?.previousElementSibling
      if (prev) {
        scrollIntoView(prev)
      }
    }
  }
  const scrollToNext = () => {
    let didScroll = false

    for (const el of sortedScrolled.value) {
      if (el.getBoundingClientRect().top > 52) {
        scrollIntoView(el)
        el.focus?.()
        didScroll = true
        break
      }
    }
    if (!didScroll) {
      let next
      if (sortedScrolled.value.length === 0) {
        const el = document.querySelector("#item")
        const firstItem = el?.children[1]?.children?.[0]
        next = firstItem
      } else {
        next = sortedScrolled.value[sortedScrolled.value.length - 1]
      }
      while (next && next.getBoundingClientRect().top < 52) {
        next = next.nextElementSibling as HTMLElement
      }
      next && scrollIntoView(next)
    }
  }

  return {
    scrollToPrev,
    scrollToNext,
  }
}
