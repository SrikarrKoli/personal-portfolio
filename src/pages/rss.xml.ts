import type { APIRoute } from 'astro';
import { profile } from '../data/profile';
import { projects } from '../data/projects';

export const GET: APIRoute = ({ site, url }) => {
  const origin = site?.toString().replace(/\/$/, '') || url.origin;
  const items = projects.map(project => {
    const link = `${origin}/work/${project.id}`;
    return `<item><title>${escapeXml(project.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><description>${escapeXml(project.summary)}</description></item>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(profile.name)}</title><description>${escapeXml(profile.description)}</description><link>${escapeXml(origin)}</link><language>en-us</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
};

const XML_ESCAPE_PATTERNS = [
  [/&/g, "&amp;"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"],
  [/"/g, "&quot;"],
  [/'/g, "&apos;"],
] as const;

function escapeXml(str: string): string {
  let result = str;
  for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
