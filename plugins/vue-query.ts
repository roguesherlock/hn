import type {
  DehydratedState,
  VueQueryPluginOptions,
} from "@tanstack/vue-query"
import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from "@tanstack/vue-query"
// Nuxt 3 app aliases
import { useState } from "#app"
// import { persistQueryClient } from "@tanstack/query-persist-client-core"
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query")

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 48, // 48 hours
        staleTime: 5000,
        suspense: true,
      },
    },
  })
  const options: VueQueryPluginOptions = {
    queryClient,
    // clientPersister: (queryClient) => {
    //   return persistQueryClient({
    //     queryClient,
    //     persister: createSyncStoragePersister({ storage: localStorage }),
    //   })
    // },
  }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (process.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (process.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
