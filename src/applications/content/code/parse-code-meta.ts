export function parseCodeMeta(meta?: string | null): Record<string, string> {
  if (!meta) return {};

  const entries: [string, string][] = [];

  meta.split(/\s+/).forEach((pair) => {
    if (!pair) return;

    const idx = pair.indexOf("=");
    if (idx === -1) return;

    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();

    if (key && value) entries.push([key, value]);
  });

  return Object.fromEntries(entries);
}
