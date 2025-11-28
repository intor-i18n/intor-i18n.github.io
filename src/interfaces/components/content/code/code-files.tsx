import { FolderCode } from "lucide-react";
import React from "react";
import { cn } from "@/applications/shadcn/lib/utils";
import {
  Files,
  FolderItem,
  FolderTrigger,
  FolderContent,
  SubFiles,
  FileItem,
} from "@/interfaces/components/shadcn/animate-ui/files";

type FileNode =
  | {
      type: "file";
      gitStatus?: "untracked" | "modified" | "deleted";
    }
  | {
      type: "folder";
      gitStatus?: "untracked" | "modified" | "deleted";
      isRoot?: boolean;
      children: Record<string, FileNode>;
    };

type FileTree = Record<string, FileNode>;

export function CodeFiles({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const fileTree: FileTree = JSON.parse(content);

  function renderTree(tree: FileTree): React.ReactNode[] {
    return Object.entries(tree).map(([key, node]) => {
      const isRootFolder = node.type === "folder" && node.isRoot;

      if (node.type === "folder") {
        const childFolderKeys = Object.entries(node.children ?? {})
          .filter(([, child]) => child.type === "folder")
          .map(([k]) => k);

        return (
          <FolderItem key={key} value={key}>
            <FolderTrigger
              gitStatus={node.gitStatus}
              closeIcon={isRootFolder && <FolderCode className="size-4.5" />}
              openIcon={isRootFolder && <FolderCode className="size-4.5" />}
            >
              {key}
            </FolderTrigger>
            <FolderContent>
              {node.children && (
                <SubFiles defaultOpen={childFolderKeys}>
                  {renderTree(node.children)}
                </SubFiles>
              )}
            </FolderContent>
          </FolderItem>
        );
      } else {
        return (
          <FileItem key={key} gitStatus={node.gitStatus}>
            {key}
          </FileItem>
        );
      }
    });
  }

  return (
    <div
      className={cn(
        "bg-background relative size-full h-fit rounded-2xl border",
        className,
      )}
    >
      <Files defaultOpen={[Object.keys(fileTree)[0]]}>
        {renderTree(fileTree)}
      </Files>
    </div>
  );
}
