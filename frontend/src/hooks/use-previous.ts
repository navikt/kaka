import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
  const prevRef = useRef<T>(undefined);

  useEffect(() => {
    prevRef.current = value;
  });

  return prevRef.current;
};
