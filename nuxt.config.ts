// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "@kevinmarrec/nuxt-pwa",
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
        class: "antialiased",
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
        { property: "og:title", content: "Nuxt Tailwind PWA" },
        {
          property: "og:description",
          content: "A Nuxt.js project with Tailwind CSS and PWA",
        },
        { property: "og:site_name", content: "Nuxt Tailwind PWA" },
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
    manifest: {
      name: "Nuxt Tailwind PWA",
      short_name: "nuxt-tailwind-pwa",
      description: "A Nuxt.js project with Tailwind CSS and PWA",
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
