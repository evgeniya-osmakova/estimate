import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { EstimateItem } from '@/types';

interface ItemsState {
  items: EstimateItem[];
}

const initialState: ItemsState = {
  items: []
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<EstimateItem, 'id' | 'totalPrice'>>) => {
      const { name, quantity, pricePerUnit } = action.payload;
      const newItem: EstimateItem = {
        id: uuidv4(),
        name,
        quantity,
        pricePerUnit,
        totalPrice: quantity * pricePerUnit
      };
      state.items.push(newItem);
    },

    updateItem: (state, action: PayloadAction<{
      id: string;
      field: 'name' | 'quantity' | 'pricePerUnit';
      value: string | number
    }>) => {
      const { id, field, value } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item[field] = value as never;

        if (field === 'quantity' || field === 'pricePerUnit') {
          item.totalPrice = item.quantity * item.pricePerUnit;
        }
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

export const selectItems = (state: { items: ItemsState }) => state.items.items;
export const selectTotalSum = (state: { items: ItemsState }) =>
  state.items.items.reduce((sum, item) => sum + item.totalPrice, 0);
