import { RefObject, useEffect } from 'react';

import { useIsDragging } from '@context';

export const useScrollAndFocus = (containerRef: RefObject<HTMLDivElement>, node: HTMLElement | null) => {
  const { isDragging } = useIsDragging();

  useEffect(() => {
    if (!node || isDragging) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const description = node.querySelector('#note-description') as HTMLElement;
          description?.focus();
          intersectionObserver.disconnect();
        }
      },
      {
        root: containerRef.current,
        threshold: 1.0,
      }
    );

    intersectionObserver.observe(node);

    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [node, containerRef]);
};
