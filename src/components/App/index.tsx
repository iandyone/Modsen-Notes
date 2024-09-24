import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/ui/Layout';
import { PAGES } from '@constants';
import { AuthContextProvider, DragContextProvider, SearchContextProvider, ToastProvider } from '@context';
import { HomePage, NotesPage } from '@pages';
import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthContextProvider>
            <SearchContextProvider>
              <DragContextProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<Navigate to={PAGES.HOME} replace />} />
                    <Route path={PAGES.HOME} element={<HomePage />} />
                    <Route path={PAGES.NOTES} element={<NotesPage />} />
                    <Route path="*" element={<Navigate to={PAGES.HOME} replace />} />
                  </Route>
                </Routes>
                <ToastContainer autoClose={5000} position="top-right" />
              </DragContextProvider>
            </SearchContextProvider>
          </AuthContextProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
