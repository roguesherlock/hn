export const useExternalLinks = (selector: string) => {
  const router = useRouter()
  const liisteners = ref<(() => void)[]>([])
  const linkHandler = (e: MouseEvent) => {
    const target = e.target as HTMLAnchorElement
    const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = e
    if (
      target &&
      //   target.matches(`${selector} a:not([href*='://'])`) &&
      target.href
    ) {
      // don't handle with control keys
      if (metaKey || altKey || ctrlKey || shiftKey) return

      // don't handle when preventDefault called
      if (defaultPrevented) return

      // don't handle right clicks
      if (button !== undefined && button !== 0) return

      // don't handle if `target="_blank"`
      //   if (target && target.getAttribute) {
      //     const linkTarget = target.getAttribute("target")
      //     if (/\b_blank\b/i.test(linkTarget ?? "")) return
      //   }
      // don't handle same page links/anchors
      const url = new URL(target.href)
      const from = `${window.location.pathname}${window.location.search}`
      const to = `${url.pathname}${url.search}`
      if (from !== to && e.preventDefault) {
        e.preventDefault()
        router.push(to)
      }
    }
  }
  const updateLinks = () => {
    const links = document.querySelectorAll(
      `${selector} a`,
    ) as NodeListOf<HTMLAnchorElement>
    links.forEach(link => {
      if (link.href.includes("news.ycombinator.com")) {
        link.setAttribute("target", "_self")
        link.addEventListener("click", linkHandler)
        liisteners.value.push(() =>
          link.removeEventListener("click", linkHandler),
        )
      } else {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")
      }
    })
  }
  onMounted(updateLinks)
  onUpdated(updateLinks)
  onUnmounted(() => {
    liisteners.value.forEach(remove => remove())
  })
}
