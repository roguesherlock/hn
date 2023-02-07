<script setup lang="ts">
import type { HNItem, HNAlgoliaItem } from "@/types"
import { useQuery } from "@tanstack/vue-query"

definePageMeta({
  validate: async route => {
    // Check if the id is made up of digits
    return /^\d+$/.test((route.query?.id as string) ?? "")
  },
})

const router = useRouter()
const route = useRoute()
const itemId = computed(() => Number(route.query?.id))

const { data: item, isLoading } = useQuery({
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

const shareTitle = computed(() => {
  if (!item.value) return ""
  if (item.value.type === "story") {
    return item.value.title
  } else if (item.value.type === "comment") {
    return `url to ${item.value.author}'s comment on HN item ${item.value.parent_id}.`
  }
  return ""
})

const shareUrl = computed(() => {
  if (!item.value) return ""
  if (item.value.type === "story") {
    let url = item.value.url
    if (!url) {
      url = window.location.href
    }
    return url
  } else if (item.value.type === "comment") {
    return window.location.href
  }
  return ""
})

const share = useShare({ title: shareTitle, url: shareUrl })

const back = () => {
  router.go(-1)
}
const routeActive = ref(true)
onActivated(() => {
  routeActive.value = true
})
onDeactivated(() => {
  routeActive.value = false
})

const scrollEl = ref<HTMLElement | null>(null)
const enabled = computed(() => {
  return routeActive.value && !isLoading.value
})
const { scrollToNext } = useNavigation({ scrollEl, enabled })

const { scrollPosition, viewed } = useItemState(item)
onActivated(() => {
  nextTick(() => {
    if (scrollPosition.value) {
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition.value, behavior: "auto" })
      }, 10)
    }
  })
})
onBeforeRouteLeave(() => {
  viewed.value = true
  scrollPosition.value = window.scrollY
})

// check for any hacker news link and add a listener to open it in our site
useExternalLinks(".prose")
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
      <button class="ml-auto mr-1" aria-label="share story" @click="share">
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
      <ul ref="scrollEl" class="mt-1 grid gap-1 pb-20">
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
  <button
    class="fixed right-8 bottom-8 grid cursor-default place-items-center rounded-full bg-purple-3 p-2 ring-purple-7 ring-offset-purple-1 transition hover:bg-purple-4 focus:outline-none focus:ring focus:ring-offset-1 active:bg-purple-5 dark:bg-purpleDark-3 dark:ring-purpleDark-7 dark:ring-offset-purpleDark-1 dark:hover:bg-purpleDark-4 dark:active:bg-purpleDark-5 md:right-5 md:bottom-5"
    aria-label="scroll to next top level reply"
    @click="scrollToNext"
  >
    <Icon
      name="heroicons:chevron-down-20-solid"
      class="h-5 w-5"
      aria-hidden="true"
    />
  </button>
</template>
