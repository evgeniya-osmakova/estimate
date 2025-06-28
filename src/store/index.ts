import { configureStore } from '@reduxjs/toolkit';
import itemsReducer, { setEstimate } from './itemsSlice';

export let isSaving = false;

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

if (typeof window !== 'undefined') {
  let saveTimeout: NodeJS.Timeout | null = null;
  let previousSerialized = '';

  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('estimateData');
      if (serializedState) {
        const estimate = JSON.parse(serializedState);
        store.dispatch(setEstimate(estimate));
      }
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
    }
  };

  window.addEventListener('load', loadFromLocalStorage);

  store.subscribe(() => {
    const state = store.getState().items;
    const estimate = {
      id: state.id,
      items: state.items,
      totalSum: state.totalSum,
    };
    const serialized = JSON.stringify(estimate);
    if (serialized !== previousSerialized) {
      previousSerialized = serialized;
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      saveTimeout = setTimeout(() => {
        try {
          localStorage.setItem('estimateData', serialized);
        } catch (err) {
          console.error('Error saving state to localStorage:', err);
        }
      }, 300);
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
