import { ErrorMessage as NavErrorMessage } from '@navikt/ds-react';

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (typeof error === 'undefined') {
    return null;
  }

  return <NavErrorMessage>{error}</NavErrorMessage>;
};
