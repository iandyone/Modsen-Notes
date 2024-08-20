import { Component, Suspense } from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from '@components/ErrorBoundary/types';
import { ErrorPage } from '@pages';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Suspense>
          <ErrorPage />
        </Suspense>
      );
    }

    return this.props.children;
  }
}
