import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Estimate, EstimateItem, Field, Fields } from '@/types'

const initialState: Estimate = {
  id: '00000000-0000-0000-0000-000000000000',
  items: [],
  totalSum: 0,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setEstimate: (state, action: PayloadAction<Estimate>) => {
      return action.payload;
    },

    addItem: (state, action: PayloadAction<Omit<EstimateItem, 'id' | 'totalPrice'>>) => {
      const { name, quantity, pricePerUnit } = action.payload;
      const newItem: EstimateItem = {
        id: uuidv4(),
        name,
        quantity,
        pricePerUnit,
        totalPrice: quantity * pricePerUnit,
      };
      state.items.push(newItem);
      state.totalSum = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },

    updateItem: (
        state,
        action: PayloadAction<{ id: string; field: Field; value: string | number }>
    ) => {
      const { id, field, value } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (!item) return;

      switch (field) {
        case Fields.NAME:
          item.name = value as string;
          break;
        case Fields.QUANTITY:
          item.quantity = value as number;
          break;
        case Fields.PRICE_PER_UNIT:
          item.pricePerUnit = value as number;
          break;
      }

      item.totalPrice = item.quantity * item.pricePerUnit;
      state.totalSum = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalSum = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
});

export const { setEstimate, addItem, updateItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;

export const selectItems = (state: { items: Estimate }) => state.items.items;
export const selectTotalSum = (state: { items: Estimate }) => state.items.totalSum;
export const selectEstimateId = (state: { items: Estimate }) => state.items.id;
