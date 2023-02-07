export const useHomeNavigation = () => {
  const route = useRoute()
  const router = useRouter()
  const currentRouteIndex = computed(() =>
    storyRoutes.findIndex(r => r.path === route.path)
  )
  const prevRoute = computed(() => storyRoutes[currentRouteIndex.value - 1])
  const nextRoute = computed(() => storyRoutes[currentRouteIndex.value + 1])

  const { j, k, h, l, o } = useMagicKeys()
  whenever(l, () => {
    if (nextRoute.value) {
      router.push(nextRoute.value.path)
    }
  })
  whenever(h, () => {
    if (prevRoute.value) {
      router.push(prevRoute.value.path)
    }
  })

  whenever(j, () => {
    if (document.activeElement?.contains(document.querySelector("#home ul"))) {
      let el = document.querySelector("#home ul li")
      while (el !== null && el.getBoundingClientRect().top < 0) {
        el = el.nextElementSibling
      }
      //@ts-ignore
      el?.querySelector("a[data-focusable]")?.focus?.()
    } else {
      document.activeElement?.parentElement?.parentElement?.nextElementSibling
        ?.querySelector("a[data-focusable]")
        //@ts-ignore
        ?.focus?.()
    }
  })

  whenever(k, () => {
    if (document.activeElement === document.body) {
      //@ts-ignore
      document.querySelector("#home ul a[data-focusable]")?.focus?.()
    } else {
      document.activeElement?.parentElement?.parentElement?.previousElementSibling
        ?.querySelector("a[data-focusable]")
        //@ts-ignore
        ?.focus?.()
    }
  })

  whenever(o, () => {
    //@ts-ignore
    document.activeElement?.click?.()
  })
}
