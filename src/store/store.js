import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../store/slices/TableSlice';
import customerReducer from '../store/slices/CustomerSlice';

const store = configureStore({
    reducer: { tables: tableReducer, customer: customerReducer },
});

export default store;
