import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import { EstimateItem } from '@/types';

export let isSaving = false;

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

if (typeof window !== 'undefined') {
  let saveTimeout: NodeJS.Timeout | null = null;

  let previousItems = store.getState().items;

  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('estimateData');
      if (serializedState) {
        const estimate = JSON.parse(serializedState);

        if (estimate.items && estimate.items.length > 0) {
          import('./itemsSlice').then(({ addItem }) => {
            setTimeout(() => {
              estimate.items.forEach((item: EstimateItem) => {
                store.dispatch(addItem({
                  name: item.name,
                  quantity: item.quantity,
                  pricePerUnit: item.pricePerUnit
                }));
              });
            }, 0);
          });
        }
      }
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
    }
  };

  if (document.readyState === 'complete') {
    loadFromLocalStorage();
  } else {
    window.addEventListener('load', loadFromLocalStorage);
  }
  store.subscribe(() => {
    const currentState = store.getState();

    if (currentState.items !== previousItems) {
      previousItems = currentState.items;

      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      isSaving = true;
      saveTimeout = setTimeout(() => {
        try {
          const state = store.getState();
          const items = state.items.items;
          const totalSum = items.reduce((sum, item) => sum + item.totalPrice, 0);

          const estimate = {
            id: state.items.id || '00000000-0000-0000-0000-000000000000',
            items: items,
            totalSum: totalSum
          };

          const serializedState = JSON.stringify(estimate);
          localStorage.setItem('estimateData', serializedState);
          setTimeout(() => {
            isSaving = false;
          }, 300);
        } catch (err) {
          console.error('Error saving state to localStorage:', err);
          isSaving = false;
        }
      }, 300);
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
