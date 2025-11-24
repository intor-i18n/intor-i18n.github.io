import { createContext, useContext } from "react";

export interface CodeTab {
  label: string;
  code: React.ReactNode;
}

const permanentGroupMap = new Map<string, CodeTab[]>();

export const CodeContext =
  createContext<Map<string, CodeTab[]>>(permanentGroupMap);

export function CodeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CodeContext.Provider value={permanentGroupMap}>
      {children}
    </CodeContext.Provider>
  );
}

export const useCode = () => {
  const context = useContext(CodeContext);
  return context;
};
