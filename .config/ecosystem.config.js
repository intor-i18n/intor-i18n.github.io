/* eslint-disable unicorn/prefer-module */
module.exports = {
  apps: [
    {
      name: "tools", //============ > [Customize]
      script: "../.next/standalone/server.js",
      exec_mode: "cluster",
      instances: 1,
      max_memory_restart: "350M",
      restart_delay: 5000,
      exp_backoff_restart_delay: 100,
      error_file: "/home/ubuntu/logs/tools-error.log", //============ > [Customize]
      out_file: "/home/ubuntu/logs/tools-out.log", //============ > [Customize]
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      combine_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      },
    },
  ],
};
