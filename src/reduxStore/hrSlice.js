import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preferenceDetails: [],
  hrBenefitsInsuranceDetails: [],
  hrBenefitsDetails: [],
  hrPensionDetails: [],
  hrAssetsDetails: [],
  orgChartData: {},
  isHrJobs: false,
  hrUserId: 0,
  userAssigneeData: {},
  assignedUser: [],
  unAssignedUsers: [],
  searchValue: '',
  isSelectedNode: false,
  isUpdateOrgChart: false,
  orgChatRootNode: 0,
  isPersonalTab: false,
  isOrgChartEdit: false,
  isEdit: false,
  orgPermission : 0,
  isIntialisedNode: false
};

// reduser
const hrSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setPreferenceData: (state, { payload }) => {
      state.preferenceDetails = payload;
    },
    setBeneFitInsuranceData: (state, { payload }) => {
      state.hrBenefitsInsuranceDetails = payload;
    },
    setBenefitData: (state, { payload }) => {
      state.hrBenefitsDetails = payload;
    },
    setPensionData: (state, { payload }) => {
      state.hrPensionDetails = payload;
    },
    setAssetsData: (state, { payload }) => {
      state.hrAssetsDetails = payload;
    },
    setOrgChartData: (state, { payload }) => {
      state.orgChartData = payload;
    },
    setHrJObs: (state, { payload }) => {
      state.isHrJobs = payload;
    },
    setHrUserId: (state, { payload }) => {
      state.hrUserId = payload;
    },
    setUserAssigneeData: (state, { payload }) => {
      state.userAssigneeData = payload;
    },
    setAssignedUserList: (state, { payload }) => {
      state.assignedUser = payload;
    },
    setUnAssignedUserList: (state, { payload }) => {
      state.unAssignedUsers = payload;
    },
    setSearchValueOrgChart: (state, { payload }) => {
      state.searchValue = payload;
    },
    setNodeSelect: (state, { payload }) => {
      state.isSelectedNode = payload;
    },
    setUpdateOrgChart: (state, { payload }) => {
      state.isUpdateOrgChart = payload;
    },
    setOrgChatRootNode: (state, { payload }) => {
      state.orgChatRootNode = payload;
    },
    setOrgChartPersonalTab: (state, { payload }) => {
      state.isPersonalTab = payload;
    },
    setIsOrgChartEdit: (state, { payload }) => {
      state.isEdit = payload;
    },
    setOrgChartPermissions: (state, { payload }) => {
      state.orgPermission = payload;
    },
    setInitialFunction : (state, { payload }) => {
    state.isIntialisedNode  = payload;
  },
  },
});

export const {
  setOrgChartPermissions,
  setIsOrgChartEdit,
  setOrgChartPersonalTab,
  setOrgChatRootNode,
  setUpdateOrgChart,
  setNodeSelect,
  setSearchValueOrgChart,
  setAssignedUserList,
  setUnAssignedUserList,
  setUserAssigneeData,
  setHrUserId,
  setPreferenceData,
  setBeneFitInsuranceData,
  setBenefitData,
  setPensionData,
  setAssetsData,
  setOrgChartData,
  setHrJObs,
  setInitialFunction
} = hrSlice.actions;

export default hrSlice.reducer;
