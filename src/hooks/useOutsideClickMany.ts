import { RefObject, useEffect } from 'react';

export const useOutsideClickMany = <T extends HTMLElement>(refs: RefObject<T>[], action: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickedOutside = refs.every(
        (ref) =>
          ref.current && !ref.current.contains(event.target as Node) && document.body.contains(event.target as Node)
      );

      if (isClickedOutside) {
        action();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [action]);
};
