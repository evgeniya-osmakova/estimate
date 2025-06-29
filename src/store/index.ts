import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import saveStatusReducer from '@/store/saveStatusSlice'

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        saveStatus: saveStatusReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
