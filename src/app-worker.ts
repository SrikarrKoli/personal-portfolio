import landscapeLiving from "./landscape/living-scene.mjs?raw";
import landscapeHtml from "./landscape/world.html?raw";
import landscapeJavascript from "./landscape/client.js?raw";
import landscapeScene from "./landscape/scene.mjs?raw";
import landscapeStyles from "./landscape/style.css?raw";
import template from "./trail/world.html?raw";
import favicon from "../public/favicon.svg?raw";
import { profile } from "./data/profile";
import { fontBase64, pixelFontBase64, monoFontBase64 } from "./trail/font";
const fontBytes = Uint8Array.from(atob(fontBase64), character => character.charCodeAt(0));
const pixelFontBytes = Uint8Array.from(atob(pixelFontBase64), character => character.charCodeAt(0));

const monoFontBytes = Uint8Array.from(atob(monoFontBase64), character => character.charCodeAt(0));

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
const html = template.replaceAll("__TRAIL_TITLE__", escapeHtml(profile.siteTitle)).replaceAll("__INTRODUCTION__", escapeHtml(profile.introduction));
import javascript from "./trail/client.bundle.js?raw";

const commonHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
};

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);
    const path = pathname.replace(/\/$/, "");
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { ...commonHeaders, Allow: "GET, HEAD" } });
    }
    if (path === "/app/favicon.svg" || path === "/favicon.svg") {
      return new Response(request.method === "HEAD" ? null : favicon, { headers: { ...commonHeaders, "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=0, must-revalidate" } });
    }
    if (path === "/app/mono-font.woff2") {
      return new Response(request.method === "HEAD" ? null : monoFontBytes, { headers: { ...commonHeaders, "Content-Type": "font/woff2", "Cache-Control": "public, max-age=86400" } });
    }
    if (path === "/app/pixel-font.woff2") {
      return new Response(request.method === "HEAD" ? null : pixelFontBytes, { headers: { ...commonHeaders, "Content-Type": "font/woff2", "Cache-Control": "public, max-age=86400" } });
    }
    if (path === "/app/font.woff2") {
      return new Response(request.method === "HEAD" ? null : fontBytes, { headers: { ...commonHeaders, "Content-Type": "font/woff2", "Cache-Control": "public, max-age=86400" } });
    }
    if (path === "/app/health") {
      return Response.json({ worker: "hello-app", status: "ok" }, { headers: commonHeaders });
    }
    const landscapeAssets: Record<string, [string, string]> = {
      "/app/landscape.js": [landscapeJavascript, "text/javascript; charset=utf-8"],
      "/app/scene.mjs": [landscapeScene, "text/javascript; charset=utf-8"],
      "/app/living-scene.mjs": [landscapeLiving, "text/javascript; charset=utf-8"],
      "/app/landscape.css": [landscapeStyles, "text/css; charset=utf-8"],
    };
    const asset = landscapeAssets[path];
    if (asset) {
      return new Response(request.method === "HEAD" ? null : asset[0], { headers: { ...commonHeaders, "Content-Type": asset[1], "Cache-Control": "public, max-age=0, must-revalidate" } });
    }
    if (path === "/app/trail.js") {
      return new Response(request.method === "HEAD" ? null : javascript, { headers: { ...commonHeaders, "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" } });
    }
    if (path === "/app" || path === "" || path === "/app/trail") {
      return new Response(request.method === "HEAD" ? null : path === "/app/trail" ? html : landscapeHtml, { headers: { ...commonHeaders, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'" } });
    }
    return new Response("Trail not found", { status: 404, headers: commonHeaders });
  },
} satisfies ExportedHandler;
