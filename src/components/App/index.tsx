import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/ui/Layout';
import { PAGES } from '@constants';
import { AuthContextProvider, DragContextProvider, SearchContextProvider } from '@context';
import { HomePage, NotesPage } from '@pages';

export const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
            </DragContextProvider>
          </SearchContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
