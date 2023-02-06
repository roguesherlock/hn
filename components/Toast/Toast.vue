<script setup lang="ts">
import { useSwipe } from "@vueuse/core"

// export type ToastType = "info" | "success" | "warning" | "error"
export type ToastType = "info" | "success" | "error"

interface Props {
  type?: ToastType
  title: string
  description?: string
}

interface Emit {
  (event: "dismiss"): void
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
})
const emit = defineEmits<Emit>()

const iconName = computed(() => {
  switch (props.type) {
    case "info":
      return "heroicons:information-circle-20-solid"
    case "success":
      return "heroicons:check-circle-20-solid"
    // case "warning":
    //   return ExclamationIcon
    case "error":
      return "heroicons:x-circle-20-solid"
    default:
      return "heroicons:information-circle-20-solid"
  }
})

const el = ref<HTMLElement>()
useSwipe(el, {
  onSwipeEnd: (e, direction) => {
    if (direction === "RIGHT") {
      emit("dismiss")
    }
  },
})
</script>
<template>
  <div
    ref="el"
    class="pointer-events-auto w-full min-w-[24rem] overflow-hidden text-mauve-12 shadow-lg ring-1 ring-opacity-5 dark:text-mauveDark-12"
    :class="{
      'bg-purple-3 shadow-purple-9/10 ring-purple-6 dark:bg-purpleDark-3 dark:shadow-purpleDark-9/10 dark:ring-purpleDark-6':
        type === 'info' || type === 'success',
      'bg-tomato-3 shadow-tomato-9/10 ring-tomato-6 dark:bg-tomatoDark-3 dark:shadow-tomatoDark-9/10 dark:ring-tomatoDark-6':
        type === 'error',
    }"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <slot name="icon">
            <Icon
              :name="iconName"
              class="h-6 w-6"
              :class="{
                'text-purple-9 dark:text-purpleDark-9':
                  type === 'info' || type === 'success',
                'text-tomato-9 dark:text-tomatoDark-9': type === 'error',
              }"
            />
          </slot>
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium">
            <slot name="title">
              {{ title }}
            </slot>
          </p>
          <p
            class="mt-1 text-sm"
            :class="{
              'text-mauve-11 dark:text-mauveDark-11':
                type === 'info' || type === 'success',
              'text-tomato-11 dark:text-tomatoDark-11': type === 'error',
            }"
          >
            <slot name="description">
              {{ description }}
            </slot>
          </p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <slot name="action"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
