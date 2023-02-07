<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"

const type = computed(() => useRoute().params.type as string)

definePageMeta({
  middleware: to => {
    if (!Object.keys(storyTypeMap).includes(to.params?.type as string)) {
      return navigateTo("/top")
    }
  },
})

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
  // @ts-ignore
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
})
await suspense()

useSeoMeta({
  title: capitalize(type.value) + " Stories",
})

// dynamically add more items to the list rather than all at once to improve perfomance and network waterfall issues!
const CURSOR_SIZE = 30
const items = ref<number[]>([])
const cursor = ref(0)
const loaded = ref(false)
useInfiniteScroll(
  window,
  () => {
    cursor.value = cursor.value + CURSOR_SIZE
    items.value = data.value?.slice(0, cursor.value) ?? []
  },
  { distance: 10 }
)
watch(
  data,
  () => {
    if (data.value && !loaded.value) {
      loaded.value = true
      if (data.value.length < CURSOR_SIZE) {
        cursor.value = data.value.length
      } else {
        cursor.value = CURSOR_SIZE
      }
      items.value = data.value?.slice(0, cursor.value) ?? []
    }
  },
  { immediate: true }
)
watch(storyType, () => {
  // reset cursor
  loaded.value = false
  cursor.value = 0
})
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
        v-for="id in items"
        :key="id"
        v-memo="[currentStoryId === id]"
        :id="id"
      />
    </ul>
  </div>
</template>
