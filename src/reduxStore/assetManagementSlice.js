import { createSlice } from '@reduxjs/toolkit';
// import { postData } from "../services/apicall";

const initialState = {
  currenttap: 1,
  taplist: {},
  location_id: '',
};

// reduser
const assetManagementSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setCurrentTap: (state, { payload }) => {
      state.currenttap = payload;
    },
    setTapList: (state, { payload }) => {
      state.taplist = payload;
    },
    setLocationId: (state, { payload }) => {
      state.location_id = payload;
    },
  },
});

export const { setCurrentTap, setTapList, setLocationId } =
  assetManagementSlice.actions;

export default assetManagementSlice.reducer;
