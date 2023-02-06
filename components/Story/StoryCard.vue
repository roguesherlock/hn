<script setup lang="ts">
import type { HNItem } from "@/types"
interface Props {
  as?: string
  story: HNItem<"story">
  static?: boolean
  big?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "li",
  static: false,
  big: false,
})

const url = computed(() => {
  return new URL(props.story?.url ?? "")
})
const formattedTime = computed(() => {
  if (props.story) {
    if (typeof props.story.time === "number") {
      formatDateWithTime(props.story.time * 1000)
    } else {
      return formatDateWithTime(props.story.time)
    }
  }
})
const shortTime = computed(() => {
  if (props.story) {
    if (typeof props.story.time === "number") {
      return formatDistanceToNow(props.story.time * 1000)
    } else {
      return formatDistanceToNow(props.story.time)
    }
  }
})
</script>
<template>
  <component v-if="story && !story.dead" :is="as" class="group relative">
    <div
      class="space-y-2 transition-all sm:p-5"
      :class="{
        'p-4': big,
        'px-4 py-2': !big,
        'bg-purple-3 dark:bg-purpleDark-3': static,
        'bg-purple-3 group-focus-within:bg-purple-4 group-hover:bg-purple-4 dark:bg-purpleDark-3 dark:group-focus-within:bg-purpleDark-4 dark:group-hover:bg-purpleDark-4': true,
        'group-focus-within:ring-1 group-focus-within:ring-purple-6 group-hover:ring-1 group-hover:ring-purple-6 dark:group-focus-within:ring-purpleDark-6 dark:group-hover:ring-purpleDark-6':
          !static,
      }"
    >
      <h1
        class="font-semibold"
        :class="[big ? 'text-lg sm:text-2xl' : '']"
        v-html="story.title"
      ></h1>
      <div
        v-if="static && story.text"
        class="prose dark:prose-invert sm:prose-lg"
        v-html="story.text"
      ></div>

      <div
        v-if="static && story.url"
        class="relative my-2 flex w-full items-center gap-2 bg-purple-4 px-3 py-2 text-base font-medium ring-offset-transparent transition hover:ring-1 hover:ring-purple-7 focus:outline-none focus:ring-1 focus:ring-purple-7 active:bg-purple-5 dark:bg-purpleDark-4 dark:ring-purpleDark-7 dark:hover:ring-purpleDark-7 dark:active:bg-purpleDark-5 md:text-lg"
      >
        <Icon
          name="heroicons:link-20-solid"
          class="h-4 w-5 flex-shrink-0 md:h-5 md:w-5"
        />
        <a
          :href="story.url"
          class="truncate"
          target="_blank"
          :title="story.url"
        >
          <span class="absolute inset-0"></span>
          <span class="">
            {{ url.hostname }}
          </span>
          <span class="truncate text-purple-7 dark:text-purpleDark-7"
            >{{ url.pathname }}
          </span>
        </a>
        <Icon
          name="heroicons:chevron-right-20-solid"
          class="ml-auto h-4 w-4 flex-shrink-0 md:h-5 md:w-5"
        />
      </div>

      <div
        class="mt-0.125 flex flex-wrap items-center gap-2 text-purple-12 dark:text-purpleDark-12"
        :class="[big ? 'text-sm sm:text-base' : 'text-sm']"
      >
        by
        <NuxtLink :to="`/user?id=${story.by}`" class="subtle-link">
          {{ story.by }}
        </NuxtLink>
      </div>
      <dl
        class="flex flex-wrap items-center gap-1.5 text-purple-12 dark:text-purpleDark-12"
        :class="[big ? 'text-sm sm:text-base' : 'text-xs']"
      >
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> Story score </span>
            <button
              class="flex cursor-default"
              :class="{
                'hover:rounded hover:bg-purple-6 hover:text-purple-12 hover:ring-1 hover:ring-purple-7 active:bg-purple-7 active:ring-purple-8  dark:hover:bg-purpleDark-6 dark:hover:text-purpleDark-12 dark:hover:ring-purpleDark-7 dark:active:bg-purpleDark-7 dark:active:ring-purpleDark-8': true,
              }"
            >
              <Icon
                name="heroicons:arrow-up-20-solid"
                class="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </button>
          </dt>
          <dd>
            {{ story.score }}
          </dd>
        </div>
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> Number of comments </span>
            <Icon name="heroicons:chat-bubble-left-right" class="h-3.5 w-3.5" />
          </dt>
          <dd>{{ story.descendants }}</dd>
        </div>
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> time </span>
            <Icon name="heroicons:clock" class="h-3.5 w-3.5" />
          </dt>
          <dd>
            <time :datetime="formattedTime" :title="formattedTime">
              {{ shortTime }}
            </time>
          </dd>
        </div>
      </dl>
      <NuxtLink
        v-if="!static"
        :to="`/item?id=${story.id}`"
        class="cursor-default"
        data-focusable="true"
        :aria-label="`Open HN Item: ${story.title}`"
      >
        <span class="absolute inset-0"></span>
      </NuxtLink>
    </div>
  </component>
</template>
