import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OnBeHalf } from '../onBeHalf';
import Loader from '../loader';
import { findLabelText, validateOnBehalfOfUser } from '../commonMethod';
import { useDispatch, useSelector } from 'react-redux';
import { setQuickBookState } from '../../reduxStore/quickBookSlice';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import { SaveWeekBook } from '../../services/apiurl';
import Toaster from '../toast';
import {
  changeDashBoardLastAPIRes,
  setChangeScheduleinDashboard,
  setDashboardDayList,
  setDashboardListUpdate,
} from '../../reduxStore/dashboardSlice';
import { QuickbookLabels } from './constant';

type QuickBookWeekProps = {
  btnDisable: boolean;
  updateBookedFor: CallableFunction;
  loading: boolean;
  bookedFor: Object;
  conformData: Object;
};

const QuickBookWeekFooter: React.FC<QuickBookWeekProps> = ({
  btnDisable,
  updateBookedFor,
  loading,
  bookedFor,
  conformData,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setQuickBookState('close'));
    dispatch(setDashboardListUpdate(true));
  };
  const { dashboardDayList, dashboardDayApiList } = useSelector(
    (state: any) => state.dashboard,
  );
  const { userDetails } = useSelector((state: any) => state?.app);
  const [bookedForDetails, setBookedForDetails] = useState<any>({});

  const upDateSchedule = () => {
    dispatch(showLoader());
    postData(
      SaveWeekBook,
      {
        book_for: bookedFor ? bookedFor : '',
        weekly_schedule: conformData,
        location_id: bookedFor
          ? bookedForDetails?.location_id
          : userDetails?.location[0]?.id,
        start_timezone: bookedFor
          ? bookedForDetails?.timezone
          : userDetails?.timezone,
        end_timezone: bookedFor
          ? bookedForDetails?.timezone
          : userDetails?.timezone,
      },
      (data, res) => {
        dispatch(hideLoader());
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200) {
          const preparFullData = {
            common_data: data?.common_data,
            book_data: dashboardDayList?.book_data,
          };
          const preparApiFullData = {
            common_data: data?.common_data,
            book_data: dashboardDayApiList?.book_data,
          };
          dispatch(setDashboardDayList(preparFullData));
          dispatch(changeDashBoardLastAPIRes(preparApiFullData));
          dispatch(setChangeScheduleinDashboard(true));
          handleClose();
        }
      },
    );
  };
  return (
    <div className="card-footer">
      {' '}
      {loading && <Loader />}
      {validateOnBehalfOfUser() && (
        <OnBeHalf
          selectedUser={data => {
            if (data?.id) {
              updateBookedFor(data?.id);
              setBookedForDetails(data);
            } else {
              updateBookedFor('');
            }
          }}
        />
      )}
      <div className="booking-btns week-btns">
        <Link to="#" className="btn clear-book" onClick={handleClose}>
          {findLabelText('Cancel', 'Cancel', 'Dashboard')}
        </Link>
        <Link
          to="#"
          className={`${'btn btn-primary next_btn '}${
            btnDisable != true ? 'room-btn-disable' : ''
          }`}
          onClick={btnDisable != true ? () => {} : upDateSchedule}
        >
          {QuickbookLabels.book}
        </Link>
      </div>
    </div>
  );
};
export default QuickBookWeekFooter;
