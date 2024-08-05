import { RefObject, useEffect } from 'react';

export const useMutationObserver = (containerRef: RefObject<HTMLDivElement>, callback: MutationCallback) => {
  useEffect(() => {
    const observer = new MutationObserver(callback);

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [containerRef, callback]);
};
