import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    HashRouter,
} from 'react-router-dom';
import WaiterPage from './components/pages/WaiterPage';
import EntryPage from './components/pages/EntryPage';
import KitchenPage from './components/pages/KitchenPage';
import CustomerPage from './components/pages/CustomerPage';
import MenuPage from './components/pages/MenuPage';
import OrderPage from './components/pages/OrderPage';
import CategoryPage from './components/pages/CategoryPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2a6c0d',
        },
        secondary: {
            main: '#55624c',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'filledTonal' },
                    style: {
                        backgroundColor: '#d8e7cb',
                        color: '#131f0d',
                        ':hover': {
                            backgroundColor: '#ccdac0',
                        },
                    },
                },
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: '#2a6c0d',
                        color: '#ffffff',
                        ':hover': {
                            backgroundColor: '#338510',
                        },
                        ':active': {
                            backgroundColor: '#3a9912',
                        },
                    },
                },
                {
                    props: { variant: 'filledTonalIcon' },
                    style: {
                        maxWidth: '40px',
                        minWidth: '40px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        color: '#131f0d',
                        backgroundColor: '#d8e7cb',
                    },
                },
            ],
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    maxHeight: '40px',
                    minHeight: '40px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontFamily: 'Rubik',
                },
            },
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        backgroundColor: '#fdfdf6',
                        border: '1dp #73796d',
                    },
                },
                {
                    props: { variant: 'filled' },
                    style: {
                        backgroundColor: '#f2f5eb',
                    },
                },
            ],
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
        // MuiAlert: {
        //     styleOverrides: {
        //         standardSuccess: {
        //             '.categoryFoodAddAlertSuccess': {
        //                 display: 'none',
        //             },
        //         },
        //     },
        // },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
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
                        path='/tables/:tableid/menu/categories/:foodCategory'
                        exact
                        element={<CategoryPage />}
                    />
                    <Route
                        path='/tables/:tableid/order'
                        exact
                        element={<OrderPage />}
                    />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
