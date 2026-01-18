export const PAGES = {
  home: { path: "/" },
  introduction: { path: "/introduction" },

  frameworks: {
    path: "/frameworks",

    // Next.js
    nextJs: {
      path: "/frameworks/next-js",
      dynamicLoading: {
        path: "/frameworks/next-js/dynamic-loading",
      },
    },

    // Vite react
    viteReact: {
      path: "/frameworks/vite-react",
      dynamicLoading: {
        path: "/frameworks/vite-react/dynamic-loading",
      },
    },
  },

  icu: { path: "/icu" },
} as const;
