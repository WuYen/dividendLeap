import { useEffect, useRef } from "react";

export default function useIsMounted() {
  const isMount = useRef(true);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  return isMount;
}
