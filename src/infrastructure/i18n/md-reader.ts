import type { Messages, MessagesReader } from "intor";
import fs from "node:fs/promises";
import { remark } from "remark";
import remarkGfm from "remark-gfm";

/**
 * Read a Markdown file and return as a Messages-like object.
 * - Currently returns the content under `content` key.
 */
export const mdReader: MessagesReader = async (
  filePath: string,
): Promise<Messages> => {
  // Read file
  const raw = await fs.readFile(filePath, "utf8");

  // Process Markdown (GFM support)
  const processed = await remark().use(remarkGfm).process(raw);

  // Convert to string (Or to HTML, React-friendly)
  const content = processed.toString();

  // Wrap in Messages structure
  const result: Messages = {
    content: content,
  };

  return result;
};
