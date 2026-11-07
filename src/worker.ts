import handler, { createScheduledHandler, PluginBridge } from "@emdash-cms/cloudflare/worker";

export { PluginBridge };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/app" || url.pathname.startsWith("/app/")) {
      return env.APP.fetch(request);
    }
    // EmDash supplies fetch; the shared ExportedHandler type makes it optional.
    return handler.fetch!(request, env, ctx);
  },
  scheduled: createScheduledHandler(),
} satisfies ExportedHandler<{ APP: Fetcher }>;
