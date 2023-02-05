<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core"

const keys = useMagicKeys()
const cntrlO = keys["Control+o"]
const cntrlI = keys["Control+i"]
const router = useRouter()
watch(cntrlO, (value) => {
  if (value) {
    router.go(-1)
  }
})
watch(cntrlI, (value) => {
  if (value) {
    router.go(1)
  }
})
</script>

<template>
  <main class="relative md:flex md:flex-row">
    <AppHeader />
    <div class="mx-auto max-w-xl flex-grow basis-full">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div class="md:flex-1"></div>
  </main>
</template>
