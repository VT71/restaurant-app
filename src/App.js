import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaiterPage from './components/pages/WaiterPage';
import EntryPage from './components/pages/EntryPage';
import KitchenPage from './components/pages/KitchenPage';
import CustomerPage from './components/pages/CustomerPage';
import MenuPage from './components/pages/MenuPage';
import OrderPage from './components/pages/OrderPage';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#93A603',
        },
        secondary: {
            main: '#F28F38',
        },
        contrastThreshold: 4.5,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {},
                contained: {
                    'border-radius': '18.25px',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path='/' exact element={<EntryPage />} />
                    <Route path='/waiter' exact element={<WaiterPage />} />
                    <Route path='/kitchen' exact element={<KitchenPage />} />
                    <Route path='/customer' exact element={<CustomerPage />} />
                    <Route
                        path='/tables/:tableid/menu'
                        exact
                        element={<MenuPage />}
                    />
                    <Route
                        path='/tables/:tableid/order'
                        exact
                        element={<OrderPage />}
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
