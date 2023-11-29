import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { postData } from '../services/apicall';
// import { deleteLines } from "../assets/globals";

const initialState = {
  dashboardFromDate:
    moment(new Date()).format('dddd') === 'Sunday'
      ? moment()
          .subtract(7, 'days')
          .startOf('isoWeek')
          .isoWeekday(1)
          .format('YYYY-MM-DD')
      : moment().startOf('isoWeek').isoWeekday(1).format('YYYY-MM-DD'),
  dashboardToDate: moment().endOf('isoWeek').isoWeekday(7).format('YYYY-MM-DD'),
  dashboardDayList: {},
  dashboardDayApiList: {},
  dashboardChildFunc: false,
  changeScheduleinDashboard: false,
  deleteAssetinDashboard: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardDayList: (state, { payload }) => {
      state.dashboardDayList = payload;
    },

    changeDashBoardLastAPIRes: (state, { payload }) => {
      state.dashboardDayApiList = payload;
    },
    setDashboardFilterDates: (state, { payload }) => {
      state.dashboardFromDate = payload.fromDate;
      state.dashboardToDate = payload.toDate;
    },
    setDashboardselctedTeam: (state, { payload }) => {
      state.dashboardselctedTeam = payload;
    },
    setDashboardChildFunc: (state, { payload }) => {
      state.dashboardChildFunc = payload;
    },
    setTeamSelectedValue: (state, { payload }) => {
      state.teamselectedvalue = payload;
    },
    setDashboardListUpdate: (state, { payload }) => {
      state.dashboardListUpdate = payload;
    },
    setChangeScheduleinDashboard: (state, { payload }) => {
      state.changeScheduleinDashboard = payload;
    },
    setDeleteAssetinDashboard: (state, { payload }) => {
      state.deleteAssetinDashboard = payload;
    },
  },
});

export const {
  setDashboardFilterDates,
  setDashboardDayList,
  changeDashBoardLastAPIRes,
  setDashboardChildFunc,
  setDashboardselctedTeam,
  setTeamSelectedValue,
  setDashboardListUpdate,
  setChangeScheduleinDashboard,
  setDeleteAssetinDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
