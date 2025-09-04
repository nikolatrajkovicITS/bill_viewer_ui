import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#1B4B91' },
    secondary: { main: '#E67E22' },
    error: { main: '#C62828' },
    grey: { 100: '#F6F7F9', 200: '#EDEFF3', 900: '#1A1C1E' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h6: { fontWeight: 700, letterSpacing: 0.2 },
    body2: { fontSize: 14 }
  },
  components: {
    MuiTable: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
    MuiButton: { defaultProps: { variant: 'contained' } }
  }
});
