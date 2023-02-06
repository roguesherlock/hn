import { MaybeRef } from "~~/types"

type ShareOptions = {
  title: MaybeRef<string>
  url: MaybeRef<string>
}

export const useShare = ({ title, url }: ShareOptions) => {
  const toast = useToast()
  const doShare = () => {
    const t = unref(title)
    navigator.clipboard.writeText(unref(url))
    toast.message(`Copied ${t ? t : "url"} to clipboard`)
  }

  return async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: unref(title),
          url: unref(url),
        })
      } catch (e) {
        console.info("navigator.share failed", e)
        doShare()
      }
    } else {
      doShare()
    }
  }
}
