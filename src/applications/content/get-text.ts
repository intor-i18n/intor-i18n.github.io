import type { ReactElement, ReactNode } from "react";
import { isValidElement } from "react";

export const getText = (children: ReactNode): string => {
  if (!children) return "";
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map((element) => getText(element)).join("");
  if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    return getText(element.props.children);
  }
  return "";
};
