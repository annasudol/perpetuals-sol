import { useEffect, useState } from "react";

export const useHydrationErrorFix = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
