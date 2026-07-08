import { useEffect, useState } from "react";

/** Returns true only after the component has mounted on the client (post-hydration). */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
