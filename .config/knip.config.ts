import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [
    "src/proxy.ts",
    "next.config.ts",
    "ecosystem.config.js",
    "src/client/interfaces/components/cms/shadcn/**",
    "src/server/interfaces/actions/web/**",
  ],
};

export default config;
