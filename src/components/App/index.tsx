import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '@components/ui/Layout';
import { HomePage, NotesPage } from '@pages';

export const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
