import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DragContextProvider } from 'context/drag-n-drop';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ErrorBoundary } from '@components/ErrorBoundary';
import { Layout } from '@components/ui/Layout';
import { PAGES } from '@constants';
import { SearchContextProvider } from '@context';
import { HomePage, SignInPage, NotesPage, SignUpPage } from '@pages';

export const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SearchContextProvider>
          <DragContextProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate to={PAGES.SIGN_IN} replace />} />
                <Route path={PAGES.HOME} element={<HomePage />} />
                <Route path={PAGES.NOTES} element={<NotesPage />} />
                <Route path={PAGES.SIGN_IN} element={<SignInPage />} />
                <Route path={PAGES.SIGN_UP} element={<SignUpPage />} />
                <Route path="*" element={<Navigate to={PAGES.HOME} replace />} />
              </Route>
            </Routes>
          </DragContextProvider>
        </SearchContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
