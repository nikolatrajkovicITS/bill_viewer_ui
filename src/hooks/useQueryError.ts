import { ERROR_MESSAGES } from '../constants';

type UseErrorProps = {
  readonly error: Error | null;
  readonly isError: boolean;
  readonly onRetry?: () => void;
};

const getStatusFromError = (error: Error): number | null => {
  const message = error.message.toLowerCase();

  if (message.includes('404')) return 404;
  if (message.includes('401')) return 401;
  if (message.includes('403')) return 403;
  if (message.includes('500')) return 500;
  if (message.includes('502')) return 502;
  if (message.includes('503')) return 503;
  if (message.includes('timeout')) return 408;

  return null;
};

export const useQueryError = ({ error, isError, onRetry }: UseErrorProps) => {
  const getErrorMessage = (): string => {
    if (!error) return ERROR_MESSAGES.DEFAULT;

    const status = getStatusFromError(error);
    switch (status) {
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 401:
      case 403:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 500:
      case 502:
      case 503:
        return ERROR_MESSAGES.SERVER_ERROR;
      case 408:
        return ERROR_MESSAGES.TIMEOUT;
      default:
        return error.message || ERROR_MESSAGES.DEFAULT;
    }
  };

  return {
    hasError: isError,
    errorMessage: getErrorMessage(),
    retry: onRetry
  };
};
