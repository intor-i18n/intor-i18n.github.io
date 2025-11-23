import { useState, useEffect } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setIsClient(true));
  }, []);
  return isClient;
}
