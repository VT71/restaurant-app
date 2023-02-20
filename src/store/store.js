import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../store/slices/TableSlice';

const store = configureStore({
    reducer: { tables: tableReducer },
});

export default store;
