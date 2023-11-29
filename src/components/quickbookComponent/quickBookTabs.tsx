import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import QuickBookWeek from './quickBookWeek';
import QuickBookDay from './quickBookDay';
import { postData } from '../../services/apicall';
import { AssetAllList } from '../../services/apiurl';
import { QuickBookTabContext } from '../context/context';
import {
  setPlanPopup,
  setQuickBookState,
} from '../../reduxStore/quickBookSlice';
import { QuickbookLabels } from './constant';

type QuickBookProps = {
  activeDashboardFunction: CallableFunction;
};

const QuickBookTabs: React.FC<QuickBookProps> = ({
  activeDashboardFunction,
}) => {
  const quickBookComponentRef = useRef<any>(null);
  const { quickBookState } = useSelector((state: any) => state?.quickBook);
  const [assetData, setAssetData] = useState();
  const [isShowWeekTab, setShowWeekTab] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'ant-picker-ranges',
        'ant-picker-time-panel-cell-inner',
        'ant-picker-now-btn',
        '',
        'ant-picker-ok',
        'ant-btn ant-btn-primary ant-btn-sm',
        'ant-picker-time-panel',
        'ant-picker-content',
        'ant-picker-cell-inner',
        'ant-picker-prev-icon',
        'ant-picker-next-icon',
        'ant-picker-super-prev-icon',
        'ant-picker-super-next-icon',
        'ant-picker-header-next-btn',
        'ant-picker-header-prev-btn',
        'ant-picker-header-super-prev-btn',
        'ant-picker-header-super-next-btn',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-end',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-start',
        'ant-picker-cell ant-picker-cell-in-view',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-end ant-picker-cell-range-hover-edge-start ant-picker-cell-range-hover-edge-start-near-range',
        'modal-open',
        'btn cancel edit',
        'modal-header',
        'modal-body',
        'main-modal-btns',
        '',
        'delete-info',
        'modal-content',
        'invite-admin-info',
        'main-modal-btns',
        'modal-title h4',
        'btn model btn',
        'ant-picker-header',
        'ant-picker-header-view',
        'ant-picker-body',
        'fade main-modal modal show',
        'btn model',
        'booking-btns',
        'btn model btn-primary',
      ];
      if (list.includes(event.target.className)) {
      } else if (
        quickBookComponentRef.current &&
        !quickBookComponentRef.current.contains(event.target)
      ) {
        handleCloseQuickBook('close');
        dispatch(setPlanPopup(false));
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const handleCloseQuickBook = value => {
    dispatch(setQuickBookState(value));
  };
  const getResponse = (data, res) => {
    if (res?.data?.code == '200') {
      setAssetData(data);
    }
  };
  useEffect(() => {
    postData(AssetAllList, '', getResponse);
  }, []);

  return (
    <QuickBookTabContext.Provider
      value={{
        assetData: assetData,
        activeDashboardFunction: activeDashboardFunction,
      }}
    >
      <div
        ref={quickBookComponentRef}
        className={`quick-book-card quick-book-sidebar ${
          quickBookState == 'active' ? 'quick-book-sidebar-open' : ''
        }`}
      >
        <div className="multistep-form">
          <fieldset id="first">
            <div className="card book-card">
              <div className="quick-book-tabs">
                <ul className="nav nav-tabs" id="quickbookTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <Link
                      className={`nav-link week-nav ${
                        isShowWeekTab ? 'active' : ''
                      }`}
                      id="works-paces"
                      data-bs-toggle="tab"
                      to="#week"
                      role="tab"
                      aria-controls="week"
                      aria-selected="true"
                      onClick={() => setShowWeekTab(true)}
                    >
                      {QuickbookLabels.week}
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      className={`nav-link ${!isShowWeekTab ? 'active' : ''}`}
                      id="rooms-tab"
                      data-bs-toggle="tab"
                      to="#day"
                      role="tab"
                      aria-controls="day"
                      aria-selected="true"
                      onClick={() => setShowWeekTab(false)}
                    >
                      {QuickbookLabels.day}
                    </Link>
                  </li>
                </ul>
              </div>
              <form>
                <div className="card-body">
                  <div className="tab-content" id="quickbookTabContent">
                    {!isShowWeekTab ? <QuickBookDay /> : <QuickBookWeek />}
                  </div>
                </div>
              </form>
            </div>
          </fieldset>
        </div>
      </div>
    </QuickBookTabContext.Provider>
  );
};
export default QuickBookTabs;
