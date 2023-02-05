<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

const storyTypeMap = {
  top: "topstories",
  new: "newstories",
  best: "beststories",
  ask: "askstories",
  show: "showstories",
  jobs: "jobstories",
}

const type = computed(() => useRoute().params.type as string)

const storyType = computed(() => {
  if (Object.keys(storyTypeMap).includes(type.value)) {
    return storyTypeMap[type.value as keyof typeof storyTypeMap]
  }
  return "topstories"
})

const route = useRoute()
const currentStoryId = computed(() => {
  return Number(route.params.ids?.[0] ?? 0)
})

const { data, suspense } = useQuery({
  queryKey: [storyType],
  queryFn: async () => {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/${storyType.value}.json`
      )
      // we only care about first 200
      return ((await response.json()) as number[]).slice(0, 200)
    } catch (e) {
      return null
    }
  },
  staleTime: import.meta.env?.VITE_TOP_STALE_TIME ?? 1000 * 60 * 5, // 5 minutes
})

onServerPrefetch(async () => await suspense())
</script>

<template>
  <div id="home" class="transition-all">
    <div
      class="mb-1 hidden h-12 items-center bg-purple-3 px-4 dark:bg-purpleDark-3 md:flex"
    >
      <h1 class="font-bold">{{ capitalize(type) }} Stories</h1>
    </div>
    <ul class="mt-[52px] grid gap-1 md:mt-[unset]">
      <StoryPreview
        v-for="id in data"
        :key="id"
        v-memo="[currentStoryId === id]"
        :id="id"
      />
    </ul>
  </div>
</template>
