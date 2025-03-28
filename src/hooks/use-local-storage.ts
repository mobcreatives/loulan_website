"use client";

import { useEffect, useState } from "react";

export function useLocalStorage() {
  const [storage, setStorage] = useState<Storage>(undefined);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setStorage(window.localStorage);
    }
  }, []);

  return {
    getItem: (key: string) => storage?.getItem(key),
    setItem: <T>(key: string, value: T) =>
      storage?.setItem(key, JSON.stringify(value)),
    removeItem: (key: string) => storage?.removeItem(key),
    clear: () => storage?.clear(),
  };
}
