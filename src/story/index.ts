/** Story-mode case pages (five beats). Cases listed here get the story at /work/<slug>/ and keep the full case at /work/<slug>/deep/. */
const files = import.meta.glob('./*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export const STORIES: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([p, html]) => [p.replace('./', '').replace('.html', ''), html]),
);
