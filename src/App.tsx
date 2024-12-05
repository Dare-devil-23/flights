import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />
                <Header />
                <HeroSection />
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App