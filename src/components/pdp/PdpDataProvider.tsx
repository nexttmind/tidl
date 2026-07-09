import { createContext, useContext, type ReactNode } from "react";
import type { PdpPageContent } from "./data/types";

const PdpDataContext = createContext<PdpPageContent | null>(null);

export function PdpDataProvider({
  data,
  children,
}: {
  data: PdpPageContent;
  children: ReactNode;
}) {
  return <PdpDataContext.Provider value={data}>{children}</PdpDataContext.Provider>;
}

export function usePdpData(): PdpPageContent {
  const ctx = useContext(PdpDataContext);
  if (!ctx) {
    throw new Error("usePdpData must be used within PdpDataProvider");
  }
  return ctx;
}
