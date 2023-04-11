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
import CategoryPage from './components/pages/CategoryPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1ED96F',
        },
        secondary: {
            main: '#010B40',
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'filledTonal' },
                    style: {
                        backgroundColor: '#91edb9',
                        borderRadius: '20px',
                        maxHeight: '40px',
                        minHeight: '40px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        fontSize: '14px',
                    },
                },
                {
                    props: { variant: 'filledTonalIcon' },
                    style: {
                        backgroundColor: '#baf5d4',
                        borderRadius: '20px',
                        maxHeight: '40px',
                        maxWidth: '40px',
                        minHeight: '40px',
                        minWidth: '40px',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                    },
                },
            ],
            styleOverrides: {
                root: {},
                contained: {
                    borderRadius: '20px',
                    height: '40px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                },
                containedPrimary: {
                    ':hover': {
                        backgroundColor: '#1cc967',
                    },
                    ':active': {
                        backgroundColor: '#18b55c',
                    },
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
            </Router>
        </ThemeProvider>
    );
}

export default App;
