import { configureStore } from '@reduxjs/toolkit';
import middleware from '../middleware';
import reducers from '../reducers';


export const store = configureStore({
    reducer: reducers,
    middleware
});
