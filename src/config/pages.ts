export const PAGES = {
  home: { path: "/" },

  introduction: {
    path: "/introduction",
    title: "pages.introduction.display",
    content: "articles.introduction.content",
  },

  frameworks: {
    path: "/frameworks",
    title: "pages.frameworks.display",
    content: "articles.frameworks.content",

    // Next.js
    nextJs: {
      path: "/frameworks/next-js",
      title: "pages.frameworks.next-js.display",
      content: "articles.frameworks.next-js.content",
      messagesLoading: {
        path: "/frameworks/next-js/messages-loading",
        title: "pages.frameworks.next-js.messages-loading.display",
        content: "articles.frameworks.next-js.messages-loading.content",
      },
    },

    // Vite react
    viteReact: {
      path: "/frameworks/vite-react",
      title: "pages.frameworks.vite-react.display",
      content: "articles.frameworks.vite-react.content",
      messagesLoading: {
        path: "/frameworks/vite-react/messages-loading",
        title: "pages.frameworks.vite-react.messages-loading.display",
        content: "articles.frameworks.vite-react.messages-loading.content",
      },
    },
  },
} as const;
