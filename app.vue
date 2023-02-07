<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core"

const keys = useMagicKeys()
const b = keys["b"]
const cntrlO = keys["Control+o"]
const cntrlI = keys["Control+i"]
const router = useRouter()
whenever(b, () => router.go(-1))
whenever(cntrlO, () => router.go(-1))
whenever(cntrlI, () => router.go(1))
</script>

<template>
  <main class="relative md:flex md:flex-row">
    <ToastProvider />
    <AppHeader />
    <div class="mx-auto max-w-xl flex-grow basis-full">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
    <div class="md:flex-1"></div>
  </main>
</template>
