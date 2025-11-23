export const PAGES = {
  home: { path: "/" },

  quickStart: {
    path: "/quick-start",
    i18nKey: "pages.quick-start.display",
  },
  nextJs: {
    path: "/quick-start/next-js",
    i18nKey: "pages.next-js.display",
  },
  viteReact: {
    path: "/quick-start/vite-react",
    i18nKey: "pages.vite-react.display",
  },
} as const;
