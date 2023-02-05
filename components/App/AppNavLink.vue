<script setup lang="ts">
interface Props {
  href: string
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
})
</script>
<template>
  <NuxtLink
    :to="href"
    class="px-4 py-1 text-right transition-all hover:bg-purple-4 active:bg-purple-5 dark:hover:bg-purpleDark-4 dark:active:bg-purpleDark-5"
    :class="[active ? 'bg-purple-5 dark:bg-purpleDark-5' : '']"
  >
    <slot />
  </NuxtLink>
</template>
