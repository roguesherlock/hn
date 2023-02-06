// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@kevinmarrec/nuxt-pwa",
    "@pinia/nuxt",
    "@vueuse/nuxt",
  ],
  css: ["@fontsource/inter/variable.css"],
  typescript: {
    strict: true,
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
  },
  app: {
    keepalive: true,
    head: {
      htmlAttrs: {
        class: "dark antialiased",
      },
      // Prevent arbitrary zooming on mobile devices
      viewport:
        "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover",
      bodyAttrs: {
        class:
          "bg-purple-1 text-mauve-12 selection:bg-purple-4 dark:bg-purpleDark-1 dark:text-mauveDark-12 dark:selection:bg-purpleDark-4",
      },
      link: [
        {
          rel: "icon",
          href: "favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        {
          rel: "mask-icon",
          href: "/favicons/pwa-512x512.png",
        },
      ],
      meta: [
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        // open graph social image
        { property: "og:title", content: "Hacker News" },
        {
          property: "og:description",
          content: "A Simple hacker news client",
        },
        { property: "og:site_name", content: "Hacker News" },
        { property: "msapplication-TileColor", content: "#da532c" },
        {
          name: "theme-color",
          media: "(max-width: 640px)",
          content: "hsl(283, 30.0%, 11.8%)",
        },
        {
          name: "theme-color",
          media: "(min-width: 640px)",
          content: "hsl(284, 20.0%, 9.6%)",
        },
      ],
    },
  },
  pwa: {
    meta: {
      title: "Hacker News",
      description: "A Simple hacker news client",
    },
    manifest: {
      name: "Hacker News",
      short_name: "hn",
      description: "A Simple hacker news client",
      background_color: "hsl(284, 20.0%, 9.6%)",
      theme_color: "hsl(284, 20.0%, 9.6%)",
      icons: [
        {
          src: "favicons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "favicons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "favicons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
      ],
    },
  },
})
