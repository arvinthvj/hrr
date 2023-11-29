import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import assetManagementSlice from './assetManagementSlice';
import dashboardSlice from './dashboardSlice';
import languageSettingSlice from './languageSettingSlice';
import { getPreloadedState, saveToLocalStorage } from './localStorage';
import quickBookSlice from './quickBookSlice';
import healthAndSafetySlice from './superAdmin/healthAndSafetySlice';
import hrSlice from './hrSlice';

const combinedReducer = combineReducers({
  app: appSlice,
  quickBook: quickBookSlice,
  assetManagement: assetManagementSlice,
  language: languageSettingSlice,
  dashboard: dashboardSlice,
  healthAndSafety: healthAndSafetySlice,
  hr: hrSlice,
});

const rootReducer = (state, action) => {
  /**
   * to reset whole app state to initial state
   */
  if (action.type === 'app/logout') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState(),
  // devTools: true
});

function onStateChange() {
  saveToLocalStorage(store.getState());
}

store.subscribe(onStateChange);

export default store;
