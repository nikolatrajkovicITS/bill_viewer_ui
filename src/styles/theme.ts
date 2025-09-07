import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8'
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa'
    },
    error: { main: '#dc2626' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      900: '#111827'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h6: { fontWeight: 700, letterSpacing: 0.2 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.8rem', lineHeight: 1.4 }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiTable: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid #e5e7eb'
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f3f4f6'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#d1d5db',
            borderRadius: 3,
            '&:hover': {
              backgroundColor: '#9ca3af'
            }
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#f8fafc',
            fontWeight: 600,
            fontSize: '0.75rem',
            color: '#374151',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '12px 16px',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            borderBottom: '2px solid #e5e7eb'
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root': {
            '&:hover': {
              backgroundColor: '#f9fafb'
            },
            '&:nth-of-type(even)': {
              backgroundColor: '#fafbfc'
            }
          },
          '& .MuiTableCell-body': {
            padding: '12px 16px',
            fontSize: '0.875rem',
            color: '#374151',
            borderBottom: '1px solid #f3f4f6'
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#fafbfc'
        }
      }
    }
  }
});
