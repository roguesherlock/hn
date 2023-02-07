<script setup lang="ts">
import type { HNUser } from "@/types"
interface Props {
  as?: string
  user: HNUser
}

const props = withDefaults(defineProps<Props>(), {
  as: "li",
})
</script>
<template>
  <component v-if="user" :is="as" class="group relative">
    <div
      class="space-y-2 bg-purple-3 p-4 transition-all dark:bg-purpleDark-3 sm:p-5"
      :class="{}"
    >
      <dl class="grid gap-5 text-base text-purple-12 dark:text-purpleDark-12">
        <div class="flex items-center gap-2">
          <dt class="flex items-center gap-1 font-medium">
            <Icon
              name="heroicons:at-symbol-20-solid"
              class="h-5 w-5"
              aria-label="karma"
            />
            <span class="sr-only"> User </span>
          </dt>
          <dd class="font-black text-purpleDark-12">
            {{ user.id }}
          </dd>
        </div>
        <div class="flex items-center gap-2">
          <dt class="flex items-center gap-1 font-medium">
            <Icon
              name="heroicons:arrow-up-circle"
              class="h-5 w-5"
              aria-label="karma"
            />
            <span class="sr-only"> Karma </span>
          </dt>
          <dd class="font-black text-purpleDark-12">
            {{ user.karma }}
          </dd>
        </div>
        <div class="flex items-center gap-2">
          <dt class="flex items-center gap-1 font-medium">
            <Icon name="heroicons:cake" class="h-5 w-5" aria-label="created" />
            Since
          </dt>
          <dd class="font-black text-purpleDark-12">
            {{ formatDate(user.created * 1000) }}
          </dd>
        </div>
        <div class="grid gap-2">
          <dt class="flex items-center gap-1 font-medium">
            <Icon
              name="heroicons:information-circle-20-solid"
              class="h-5 w-5"
              aria-label="created"
            />
            About
          </dt>
          <template v-if="user.about">
            <dd
              class="prose dark:prose-invert sm:prose-lg"
              v-html="user.about"
            ></dd>
          </template>
          <template v-else>
            <dd class="prose dark:prose-invert sm:prose-lg">
              <i>{{ user.id }} has no about content.</i>
              <p>
                May I interest you in some
                <a href="https://c.xkcd.com/random/comic/" target="_blank"
                  >xkcd</a
                >?
              </p>
            </dd>
          </template>
        </div>
      </dl>
    </div>
  </component>
</template>
