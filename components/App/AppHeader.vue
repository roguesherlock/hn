<script setup lang="ts">
type Route = {
  path: string
  name: string
}
const routeList: Route[] = [
  { name: "Top", path: "/top" },
  { name: "New", path: "/new" },
  { name: "Best", path: "/best" },
  { name: "Ask", path: "/ask" },
  { name: "Show", path: "/show" },
  { name: "Jobs", path: "/jobs" },
]

const route = useRoute()

const links = computed(() =>
  routeList.map((r: Route) => {
    return {
      href: r.path,
      label: r.name,
      active: route.path === r.path,
    }
  })
)
const isHome = computed(() => route.params.type !== "item")
</script>
<template>
  <nav class="hidden flex-1 justify-end md:relative md:flex">
    <div class="fixed flex flex-col items-end space-y-4 p-3 font-mono text-lg">
      <AppNavLink
        href="/"
        aria-label="Home"
        class="font-sans text-xl font-black tracking-wide"
        :active="false"
        >HN</AppNavLink
      >
      <AppNavLink
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        :aria-label="link.label"
        :active="link.active"
        >{{ link.label }}</AppNavLink
      >
    </div>
  </nav>
  <nav
    v-if="isHome"
    class="scroll-hidden overfflow-y-hidden fixed inset-x-0 top-0 z-20 mb-1 flex h-12 items-center space-x-1 overflow-x-auto border-b border-purple-6 bg-purple-3/80 py-3 px-4 font-mono backdrop-blur-xl dark:border-purpleDark-6 dark:bg-purpleDark-3/80 md:hidden"
  >
    <NuxtLink
      to="/"
      aria-label="Home"
      class="mr-3 font-sans font-black"
      :active="false"
    >
      HN
    </NuxtLink>
    <AppNavLink
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :aria-label="link.label"
      :active="link.active"
    >
      {{ link.label }}
    </AppNavLink>
  </nav>
</template>
