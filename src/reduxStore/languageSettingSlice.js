import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLanguage: '',
  languages: {},
};

// reducer
const languageSettingSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setSelectedLanguage: (state, { payload }) => {
      state.selectedLanguage = payload;
    },
    setLanguages: (state, { payload }) => {
      state.languages = payload;
      //
      //
    },
  },
});

export const { setSelectedLanguage, setLanguages } =
  languageSettingSlice.actions;

export default languageSettingSlice.reducer;
