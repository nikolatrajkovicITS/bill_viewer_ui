import type { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';


type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = true
}: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isMobile}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1
          }}
        >
          {title}
          <IconButton onClick={onClose} size="small" sx={{ color: 'grey.500' }}>
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent sx={{ pt: title ? 1 : 3, pb: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
