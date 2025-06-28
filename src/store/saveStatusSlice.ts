import { createSlice } from '@reduxjs/toolkit';

interface SaveStatusState {
  isSaving: boolean;
}

const initialState: SaveStatusState = {
  isSaving: false,
};

export const saveStatusSlice = createSlice({
  name: 'saveStatus',
  initialState,
  reducers: {
    setSaving: (state) => {
      state.isSaving = true;
    },
    setSaved: (state) => {
      state.isSaving = false;
    },
  },
});

export const { setSaving, setSaved } = saveStatusSlice.actions;
export default saveStatusSlice.reducer;

export const selectIsSaving = (state: { saveStatus: SaveStatusState }) => state.saveStatus.isSaving;
