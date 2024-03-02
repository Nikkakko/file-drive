import { useCallback, useEffect, useRef } from "react";

function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const functionTimeoutHandler = useRef<NodeJS.Timeout>();
  const debouncedFunction = useRef(callback);
  debouncedFunction.current = callback;

  useEffect(
    () => () => {
      if (functionTimeoutHandler.current) {
        clearTimeout(functionTimeoutHandler.current);
      }
    },
    []
  );

  return useCallback(
    (...args: any[]) => {
      if (functionTimeoutHandler.current) {
        clearTimeout(functionTimeoutHandler.current);
      }
      functionTimeoutHandler.current = setTimeout(() => {
        debouncedFunction.current(...args);
      }, delay);
    },
    [delay]
  ) as T;
}

export { useDebouncedCallback };
