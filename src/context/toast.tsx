import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { ToastContextValues } from 'types';

const ToastContext = createContext({} as ToastContextValues);

export function ToastProvider({ children }: PropsWithChildren) {
  const contextValue = useMemo<ToastContextValues>(
    () => ({
      showToast: ({ message, settings }) => {
        toast(message, {
          ...settings,
        });
      },
    }),
    []
  );

  return <ToastContext.Provider value={contextValue} children={children} />;
}

export const useToast = () => useContext(ToastContext);
