<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
import type { HNAlgoliaItem } from "@/types"
import { ComponentPublicInstance } from "vue"

interface Props {
  as?: string
  defaultOpen?: boolean
  nestLevel?: number
  comment: HNAlgoliaItem
  renderKids?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "li",
  nestLevel: 0,
  defaultOpen: false,
  renderKids: true,
})

const route = useRoute()
const shouldOpen = computed(() => {
  if (props.nestLevel === 0) return true
  if (route.hash && route.hash.includes("comment")) {
    const id = Number(route.hash.split("-")[1])
    if (props.comment.id == id) {
      return true
    }
  }

  if (props.defaultOpen) {
    if (props.comment) {
      if (
        props.comment.children &&
        props.comment.children.length < 5 &&
        props.nestLevel < 3
      )
        return true
      return props.defaultOpen
    }
    return props.defaultOpen
  }
  return false
})

const formattedTime = computed(
  () => (props.comment && formatDateWithTime(props.comment.created_at)) ?? "",
)

const el = ref<ComponentPublicInstance>()
type HandleCloseOptions = {
  close: () => void
  e?: Event
  conditionallyScroll?: boolean
}
// if conditionallyScroll is true, only collapse if the current element's head is off screen
const handleClose = ({ close, e, conditionallyScroll }: HandleCloseOptions) => {
  //@ts-ignore
  const type = e?.target?.tagName?.toLowerCase?.()
  if (type === "button" || type === "a") return
  const top = el.value?.$el.getBoundingClientRect().top
  close()
  nextTick(() => {
    const scroll = conditionallyScroll ? top < 0 : true
    if (scroll) {
      const top = el.value?.$el.getBoundingClientRect().top
      window.scrollTo({
        top: top + window.scrollY - 52,
        behavior: "smooth",
      })
    }
  })
}
</script>
<template>
  <template v-if="comment">
    <HeadlessDisclosure
      ref="el"
      :as="as"
      v-slot="{ open, close }"
      v-bind="$attrs"
      :default-open="shouldOpen"
      :id="`comment-${comment.id}`"
      :data-id="`comment-${comment.id}`"
      :class="[renderKids ? '' : 'bg-purple-3 dark:bg-purpleDark-3']"
    >
      <HeadlessDisclosureButton
        class="group relative w-full cursor-default space-y-2 text-left focus:outline-none focus:ring-1 focus:ring-purple-6 ui-not-open:bg-purple-3 dark:focus:ring-purpleDark-6 dark:ui-not-open:bg-purpleDark-3"
        :disabled="!renderKids"
      >
        <div
          class="flex w-full items-center justify-between px-4 py-3 ui-open:pb-2 ui-open:pt-3 sm:px-5 sm:py-3"
        >
          <div class="flex items-center">
            <NuxtLink
              :to="`/user?id=${comment.author}`"
              class="subtle-link text-sm sm:text-base"
            >
              {{ comment.author }}
            </NuxtLink>
            <button
              class="ml-2 cursor-default"
              :class="{
                'text-purple-7 hover:rounded hover:bg-purple-6 hover:text-purple-12 hover:ring-1 hover:ring-purple-7 active:bg-purple-7 active:ring-purple-8 dark:text-purpleDark-7 hover:dark:bg-purpleDark-6 hover:dark:text-purpleDark-12 hover:dark:ring-purpleDark-7 dark:active:bg-purpleDark-7 dark:active:ring-purpleDark-8': true,
              }"
            >
              <Icon
                name="heroicons:arrow-up-20-solid"
                class="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>
          <div v-if="!open" class="flex items-center">
            <p class="-md bg-purple-4 px-1 py-0.5 text-xs dark:bg-purpleDark-4">
              {{
                (comment.children?.length && comment.children.length + 1) || 1
              }}
            </p>
            <Icon name="heroicons:chevron-down-20-solid" class="ml-2 h-4 w-4" />
          </div>
          <div
            v-else
            class="flex items-center gap-2 text-xs text-purple-7 dark:text-purpleDark-7"
          >
            <time
              class="font-mono"
              :datetime="formattedTime"
              :title="formattedTime"
            >
              {{ formatDistanceToNow(comment.created_at) }}
            </time>
          </div>
        </div>
      </HeadlessDisclosureButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <HeadlessDisclosurePanel
          class="cursor-default space-y-2 pb-3 pl-4 sm:pb-5"
          :class="[nestLevel > 1 ? '' : '']"
        >
          <div
            class="prose pr-4 dark:prose-invert sm:prose-lg"
            v-html="comment.text"
            @click="
              e =>
                isMobileScreen
                  ? handleClose({ close, e, conditionallyScroll: true })
                  : null
            "
          ></div>
          <ul
            v-if="renderKids && comment.children && comment.children.length > 0"
            class="divide-y divide-purple-6 dark:divide-purpleDark-6"
          >
            <Comment
              class="ml-1 border-l border-purple-6 dark:border-purpleDark-6"
              :style="{
                // borderLeftColor: `${colors[nestLevel % colors.length]}`,
              }"
              v-for="i in comment.children"
              :key="i.id"
              :comment="i"
              :nest-level="nestLevel + 1"
              :default-open="nestLevel < 2"
            />
          </ul>
        </HeadlessDisclosurePanel>
      </transition>
    </HeadlessDisclosure>
  </template>
</template>
