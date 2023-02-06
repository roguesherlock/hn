<script setup lang="ts">
import type { HNItem, HNAlgoliaItem } from "@/types"
import { useQuery } from "@tanstack/vue-query"

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test((route.query?.id as string) ?? "")
  },
})

const router = useRouter()
const route = useRoute()
const itemId = computed(() => Number(route.query?.id))

const {
  data: item,
  isLoading,
  suspense,
} = useQuery({
  // @ts-ignore
  queryKey: ["hn-item", itemId],
  queryFn: async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/items/${itemId.value}`
      )
      return (await response.json()) as HNAlgoliaItem
    } catch (e) {
      return null
    }
  },
  enabled: isHydrated,
})

const story = computed(() => {
  if (!item.value) return null
  return {
    id: item.value.id,
    by: item.value.author,
    time: item.value.created_at,
    kids: item.value.children,
    type: item.value.type,
    text: item.value.text,
    dead: false,
    deleted: false,
    title: item.value.title,
    score: item.value.points,
    descendants: item.value.children?.length,
    url: item.value.url,
  } as unknown as HNItem<"story">
})

const back = () => {
  router.go(-1)
}
const routeActive = ref(false)
onActivated(() => {
  routeActive.value = true
})
onDeactivated(() => {
  routeActive.value = false
})
</script>
<template>
  <Teleport v-if="itemId && routeActive" to="body">
    <div
      class="fixed inset-x-0 top-0 z-20 mx-auto grid h-12 w-full max-w-xl grid-cols-3 items-center border-b border-purple-6 bg-purple-3/80 px-4 py-2 font-medium backdrop-blur-xl transition dark:border-purpleDark-6 dark:bg-purpleDark-3/80 sm:px-4 sm:py-3"
    >
      <button
        class="flex items-center font-medium"
        aria-label="go back"
        @click="back"
      >
        <Icon
          name="heroicons:chevron-left-20-solid"
          class="mr-1 h-5 w-5"
          aria-hidden="true"
        />
        <span class="truncate text-left"
          >{{ item?.type === "story" ? "Stories" : "Story" }}
        </span>
      </button>
      <p class="mx-auto">
        <span v-show="true"> Comments </span>
      </p>
      <button class="ml-auto mr-1" aria-label="share story">
        <Icon name="radix-icons:share-2" class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </Teleport>
  <div id="item" class="mt-[52px]">
    <template v-if="item && !isLoading">
      <StoryCard
        v-if="story && story.type == 'story'"
        as="div"
        :data-id="`story-${itemId}`"
        :story="story"
        :static="true"
        :big="true"
      />
      <Comment
        v-else-if="item && item.type == 'comment'"
        :comment="item"
        as="div"
        :render-kids="false"
      />
      <ul class="mt-1 grid gap-1 pb-20">
        <Comment
          v-for="i in item?.children"
          :key="i.id"
          :comment="i"
          class="min-w-full bg-purple-2 dark:bg-purpleDark-2"
        />
      </ul>
    </template>
    <template v-else>
      <StoryPreviewSkeleton />
      <ul class="mt-1 grid gap-1 pb-20">
        <template v-for="i in 10">
          <CommentSkeleton />
        </template>
      </ul>
    </template>
  </div>
</template>
