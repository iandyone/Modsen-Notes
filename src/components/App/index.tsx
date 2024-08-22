import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DragContextProvider } from 'context/drag-n-drop';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/ui/Layout';
import { PATHS } from '@constants';
import { SearchContextProvider } from '@context';
import { HomePage, NotesPage } from '@pages';

export const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <DragContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate to={PATHS.HOME} replace />} />
                <Route path={PATHS.HOME} element={<HomePage />} />
                <Route path={PATHS.NOTES} element={<NotesPage />} />
                <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
              </Route>
            </Routes>
          </DragContextProvider>
        </SearchContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
