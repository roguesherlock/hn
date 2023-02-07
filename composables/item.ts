import type { Ref } from "vue"
import type { HNItem, HNItemState, HNAlgoliaItem } from "@/types"

type State = Map<string | number, HNItemState>
export const useItemState = (
  item: Ref<HNItem<any>> | Ref<HNAlgoliaItem> | Ref<undefined> | Ref<null>
) => {
  const initState = () => ({
    upvoted: false,
    viewed: false,
    scrollPosition: 0,
  })

  const state = useLocalStorage<State>("items-state", new Map())

  const setState = (
    id: string | number | undefined,
    value: Partial<HNItemState>
  ) => {
    if (state.value && id) {
      if (!state.value.has(id)) state.value.set(id, initState())
      state.value.set(id, { ...state.value.get(id)!, ...value })
    }
  }

  const viewed = computed({
    get() {
      if (!item.value) return false
      return state.value?.get(item.value?.id)?.viewed ?? false
    },
    set(viewed: boolean) {
      setState(item.value?.id, { viewed })
    },
  })

  const scrollPosition = computed({
    get() {
      if (!item.value) return 0
      return state.value?.get(item.value.id)?.scrollPosition ?? 0
    },
    set(scrollPosition: number) {
      setState(item.value?.id, { scrollPosition })
    },
  })

  const setScrollPositionFor = (id: number, scrollPosition: number) => {
    setState(id, { scrollPosition })
  }

  return {
    viewed,
    scrollPosition,
    setScrollPositionFor,
  }
}
