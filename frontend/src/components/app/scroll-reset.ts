import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const ScrollReset = () => {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Is supposed to react to pathname changes
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return null;
};
