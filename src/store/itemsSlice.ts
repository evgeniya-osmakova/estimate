import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Estimate, EstimateItem } from '@/types'

const initialState: Estimate = {
  id: '00000000-0000-0000-0000-000000000000',
  items: [],
  totalSum: 0
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

      state.totalSum = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
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

          state.totalSum = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
        }
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      state.totalSum = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  }
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

export const selectItems = (state: { items: Estimate }) => state.items.items;
export const selectTotalSum = (state: { items: Estimate }) => state.items.totalSum;
export const selectEstimateId = (state: { items: Estimate }) => state.items.id;
