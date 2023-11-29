import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
// import { deleteLines } from "../assets/globals";
import { dateFormat_YYYY_MM_DD } from '../assets/constants/config';

const initialState = {
  quickbookFromDate:
    moment(new Date()).format('dddd') === 'Sunday'
      ? moment()
          .subtract(7, 'days')
          .startOf('isoWeek')
          .isoWeekday(1)
          .format(dateFormat_YYYY_MM_DD)
      : moment().startOf('isoWeek').isoWeekday(1).format(dateFormat_YYYY_MM_DD),
  quickbookToDate: moment()
    .endOf('isoWeek')
    .isoWeekday(7)
    .format(dateFormat_YYYY_MM_DD),
  quickBookState: '',
  quickBookSelect: 1,
  scheduleBook: false,
  editQuickOpen: {
    openState: false,
    data: {},
  },

  planePopup: false,
  canvasImage: '',
  quickBookAssetId: '',
  beHalfOfDetails: {},
};

const quickBookSlice = createSlice({
  name: 'quickBook',
  initialState,
  reducers: {
    setQuickbookFilterDates: (state, { payload }) => {
      state.quickbookFromDate = payload.fromDate;
      state.quickbookToDate = payload.toDate;
    },
    setQuickBookState: (state, { payload }) => {
      state.quickBookState = payload;
      if (payload == 'close') {
        state.beHalfOfDetails = {};
      }
    },
    SetQuickBookSelect: (state, { payload }) => {
      state.quickBookSelect = payload;
    },
    SetQuickBookEditOpen: (state, { payload }) => {
      state.editQuickOpen = payload;
    },
    SetScheduleBookOpen: (state, { payload }) => {
      state.scheduleBook = payload;
    },
    setPlanPopup: (state, { payload }) => {
      state.planePopup = payload;
    },
    setCanvasImg: (state, { payload }) => {
      state.canvasImage = payload;
    },
    setDefaultweek: (state, { payload }) => {
      state.defaultweek = payload;
    },
    setQuicBookAssetId: (state, { payload }) => {
      state.quickBookAssetId = payload;
    },
    setQuickBeHalfOfDetails: (state, { payload }) => {
      state.beHalfOfDetails = payload.data;
      if (payload.quickBookType) {
        state.quickBookState = payload.quickBookType;
      }
      if (payload?.data?.selectedAssets) {
        state.quickBookSelect = payload.data.selectedAssets;
      }
    },
  },
});

export const {
  setQuickBookState,
  setCanvasImg,
  SetQuickBookSelect,
  SetQuickBookEditOpen,
  SetScheduleBookOpen,
  setPlanPopup,
  setDefaultweek,
  setQuickbookFilterDates,
  setQuickBeHalfOfDetails,
} = quickBookSlice.actions;

export default quickBookSlice.reducer;
