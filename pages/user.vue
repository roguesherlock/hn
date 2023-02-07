<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query"
import type { HNUser } from "@/types"

definePageMeta({
  validate: async route => {
    // Check if the id is made up of string
    return /^\w+$/.test((route.query?.id as string) ?? "")
  },
})

const route = useRoute()
const userId = computed(() => route.query?.id)

const { data: user, isLoading } = useQuery({
  // @ts-ignore
  queryKey: ["hn-user", userId],
  queryFn: async () => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/user/${userId.value}.json`
    )
    return (await response.json()) as HNUser
  },
  staleTime: import.meta.env?.VITE_STORY_STALE_TIME ?? 1000 * 60 * 10, // 10 minutes
})
</script>
<template>
  <Teleport to="body">
    <div
      class="fixed inset-x-0 top-0 z-20 mx-auto grid h-12 w-full max-w-xl grid-cols-3 items-center border-b border-purple-6 bg-purple-3/80 px-4 py-2 font-medium backdrop-blur-xl transition dark:border-purpleDark-6 dark:bg-purpleDark-3/80 sm:px-4 sm:py-3"
    >
      <button class="flex items-center font-medium" @click="$router.go(-1)">
        <Icon
          name="heroicons:chevron-left-20-solid"
          class="mr-1 h-5 w-5"
          aria-hidden="true"
        />
        <span class="truncate text-left"> back </span>
      </button>
      <p class="mx-auto">{{ user?.id }}</p>
    </div>
  </Teleport>
  <div class="mt-[52px]">
    <CommentSkeleton v-if="isLoading" />
    <UserCard
      v-else-if="user"
      as="div"
      :data-id="`user-${userId}`"
      :user="user"
    />
  </div>
</template>
