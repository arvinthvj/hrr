import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  superAdminBaseURL: '',
  roleLanguageList: [],
  uploadPlusIconUrl: '',
};

// reducer
const healthAndSafetySlice = createSlice({
  name: 'healthAndSafety',
  initialState,
  reducers: {
    setSuperAdminBaseURL: (state, { payload }) => {
      state.superAdminBaseURL = payload;
    },
    setRoleLanguageList: (state, { payload }) => {
      state.roleLanguageList = payload;
    },
    setUploadPlusIconUrl: (state, { payload }) => {
      state.uploadPlusIconUrl = payload;
    },
  },
});

export const {
  setSuperAdminBaseURL,
  setRoleLanguageList,
  setUploadPlusIconUrl,
} = healthAndSafetySlice.actions;

export default healthAndSafetySlice.reducer;
