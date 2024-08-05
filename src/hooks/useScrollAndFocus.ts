import { useEffect } from 'react';

export const useScrollAndFocus = (node: HTMLElement | null, containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!node) {
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
