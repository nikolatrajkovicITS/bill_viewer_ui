import { RefreshOutlined } from '@mui/icons-material';
import { Alert, Button, Stack } from '@mui/material';

import { ERROR_MESSAGES, RETRY_BUTTON_TEXT } from '../../../constants';

type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
};

export const ErrorMessage = ({
  message = ERROR_MESSAGES.DEFAULT,
  onRetry,
  showRetry = true
}: ErrorMessageProps) => {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>

      {showRetry && onRetry && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshOutlined />}
          onClick={onRetry}
          sx={{ alignSelf: 'center' }}
        >
          {RETRY_BUTTON_TEXT}
        </Button>
      )}
    </Stack>
  );
};
