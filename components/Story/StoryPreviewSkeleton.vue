<script setup lang="ts">
interface Props {
  static?: boolean
  big?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  static: false,
  big: false,
})
</script>
<template>
  <div class="group relative animate-pulse">
    <div
      class="space-y-2 bg-purple-2 transition-all dark:bg-purpleDark-2 sm:p-5"
      :class="[big ? 'p-4' : 'px-4 py-2', static ? '' : '']"
    >
      <h1
        class="h-3 bg-purple-3 font-semibold dark:bg-purpleDark-3 md:h-4"
        :class="[big ? 'text-lg sm:text-2xl' : '']"
      ></h1>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div
            class="col-span-2 h-3 bg-purple-3 dark:bg-purpleDark-3 md:h-4"
          ></div>
          <div
            class="col-span-1 h-3 bg-purple-3 dark:bg-purpleDark-3 md:h-4"
          ></div>
        </div>
        <div class="h-3 bg-purple-3 dark:bg-purpleDark-3 md:h-4"></div>
      </div>

      <div
        class="mt-0.125 flex h-3 flex-wrap items-center gap-2 bg-purple-3 dark:bg-purpleDark-3 md:h-3"
        :class="[big ? 'text-sm sm:text-base' : 'text-sm']"
      ></div>
      <dl
        class="flex flex-wrap items-center gap-1.5"
        :class="[big ? 'text-sm sm:text-base' : 'text-xs']"
      >
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> Story score </span>
            <Icon
              name="heroicons:arrow-up-20-solid"
              class="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </dt>
          <dd class="w-8 bg-purple-3 dark:bg-purpleDark-3"></dd>
        </div>
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> Number of comments </span>
            <Icon name="heroicons:chat-bubble-left-right" class="h-3.5 w-3.5" />
          </dt>
          <dd class="w-8 bg-purple-3 dark:bg-purpleDark-3"></dd>
        </div>
        <div class="flex items-center gap-1">
          <dt class="">
            <span class="sr-only"> time </span>
            <Icon name="heroicons:clock" class="h-3.5 w-3.5" />
          </dt>
          <dd class="w-8 bg-purple-3 dark:bg-purpleDark-3"></dd>
        </div>
      </dl>
    </div>
  </div>
</template>
