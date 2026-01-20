export const PAGES = {
  home: { path: "/" },

  introduction: {
    path: "/introduction",
    designPhilosiphy: {
      path: "/introduction/design-philosophy",
    },
  },
  frameworks: {
    path: "/frameworks",
    nextJs: {
      path: "/frameworks/next-js",
      dynamicLoading: { path: "/frameworks/next-js/dynamic-loading" },
    },
    react: {
      path: "/frameworks/react",
      dynamicLoading: { path: "/frameworks/react/dynamic-loading" },
      richTranslations: { path: "/frameworks/react/rich-translations" },
    },
  },

  // Core
  config: {
    path: "/config",
    locale: { path: "/config/locale" },
    messages: { path: "/config/messages" },
    translator: { path: "/config/translator" },
    routing: { path: "/config/routing" },
    persistence: { path: "/config/persistence" },
    messagesLoading: { path: "/config/messages-loading" },
    observability: { path: "/config/observability" },
  },
  messages: { path: "/messages" },
  translator: { path: "/translator" },
  messagesLoader: { path: "/messages-loader" },

  // Additional
  icu: { path: "/icu" },
  handlersAndPlugins: { path: "/handlers-and-plugins" },
} as const;
