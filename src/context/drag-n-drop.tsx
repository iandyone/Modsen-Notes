import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';

interface DragContextState {
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

const dragContext = createContext({} as DragContextState);

export const DragContextProvider = ({ children }: PropsWithChildren) => {
  const [isDragging, setIsDragging] = useState(false);

  const values = useMemo(
    () => ({
      isDragging,
      setIsDragging,
    }),
    [isDragging]
  );

  return <dragContext.Provider value={values}>{children}</dragContext.Provider>;
};

export const useIsDragging = () => useContext(dragContext);
