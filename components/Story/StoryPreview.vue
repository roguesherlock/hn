<script setup lang="ts">
import type { HNItem } from "@/types"
import { useQuery } from "@tanstack/vue-query"
import StoryPreviewSkeleton from "./StoryPreviewSkeleton.vue"

interface Props {
  as?: string
  id: number | string
  static?: boolean
  big?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  as: "li",
  static: false,
  big: false,
})

const config = useRuntimeConfig()

const {
  data: story,
  isLoading,
  isRefetching,
} = useQuery({
  //@ts-ignore
  queryKey: ["story", props.id],
  queryFn: async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${props.id}.json`
      )
      return (await response.json()) as HNItem<"story">
    } catch (e) {
      return null
    }
  },
  staleTime: config.public.storyStaleTime,
})
</script>
<template>
  <template v-if="isLoading || isRefetching">
    <StoryPreviewSkeleton />
  </template>
  <template v-else-if="story">
    <StoryCard
      v-if="story"
      :as="as"
      :story="story"
      :big="big"
      :static="static"
    />
  </template>
</template>
