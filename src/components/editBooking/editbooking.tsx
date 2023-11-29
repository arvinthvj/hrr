import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetQuickBookEditOpen,
  setPlanPopup,
} from '../../reduxStore/quickBookSlice';
import { Link } from 'react-router-dom';
import {
  ParkingIcon,
  RoomIcon,
  WorkspacesIcon,
  client_site,
  holiday,
  inOffice,
  other_icon,
  out_of_icon,
  remote_home,
  sickness,
} from '../imagepath';
import { postData } from '../../services/apicall';
import { useForm } from 'react-hook-form';
import { CancelBooking, GetEditBooking } from '../../services/apiurl';
import Toaster from '../toast';
import moment from 'moment/moment';
import Loader from '../loader';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  changeDashBoardLastAPIRes,
  setDashboardDayList,
  setDashboardListUpdate,
  setDeleteAssetinDashboard,
} from '../../reduxStore/dashboardSlice';
import {
  findLabelText,
  getDatesInRange,
  getUserPreferedDateFormat,
} from '../commonMethod';
import { DeleteConfirmationModal } from '../deleteConfirmationModal/DeleteConfirmationModal';
import {
  AssertIcon,
  AssertNumber,
  LabelText,
} from '../dashboardComponent/constants';
import QuickBookDaydetails from '../quickbookComponent/quickBookDaydetails';
import {
  getBookingAndNotificationCount,
  updateBlinkIcon,
} from '../../reduxStore/appSlice';

const EditBooking = ({ activeDashboardFunction }) => {
  const { dashboardFromDate, dashboardToDate, dashboardDayApiList } =
    useSelector((state: any) => state.dashboard);
  const { setValue } = useForm({
    resolver: yupResolver(schema),
  });
  const quickBookComponentRef = useRef<HTMLInputElement>(null);
  const { editQuickOpen } = useSelector((state: any) => state?.quickBook);
  const { loading } = useSelector((state: any) => state?.app);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadSpinner, SetLoadSpinner] = useState(false);
  const handleEditBooking = () => {
    dispatch(SetQuickBookEditOpen({ openState: false }));
    dispatch(setPlanPopup(false));
  };

  const closeEditDailogue = () => {
    // window.location.reload();
    dispatch(SetQuickBookEditOpen({ openState: false, data: {} }));
    setDeleteOpen(false);
  };

  const getEditBooking = () => {
    if (editQuickOpen?.data != undefined) {
      if (editQuickOpen?.data?.workspace_type == 'Room') {
        SetLoadSpinner(true);
        postData(
          GetEditBooking,
          { booking_id: editQuickOpen?.data.id },
          (data, res) => {
            SetLoadSpinner(false);
            if (res?.data.code == 200) {
              setEditData(data);
            }
          },
        );
      }
    }
  };
  useEffect(() => {
    getEditBooking();
  }, [editQuickOpen]);
  const compareandCheckDates = (responce, preDate) => {
    const res = responce;
    if (res?.book_data?.length > 0) {
      const bookData = res?.book_data;
      const pDate = preDate; // prepareDate
      for (let i = 0; i < pDate.length; i++) {
        for (let j = 0; j < bookData.length; j++) {
          if (pDate[i].date == bookData[j].booking_date) {
            const list = pDate[i]['book_data'];
            list.push(bookData[j]);
          }
        }
      }
      const preparFullData = {
        common_data: res?.common_data,
        book_data: pDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes(responce));
    } else {
      const preparFullData = {
        common_data: {},
        book_data: preDate,
      };
      dispatch(setDashboardDayList(preparFullData));
      dispatch(changeDashBoardLastAPIRes({}));
    }
  };
  const handleDeletUser = () => {
    const getDateList = getDatesInRange(dashboardFromDate, dashboardToDate);
    SetLoadSpinner(true);
    postData(
      CancelBooking,
      { booking_id: editQuickOpen.data.id },
      (data, res) => {
        SetLoadSpinner(false);
        Toaster(res?.data?.code, res?.data?.message);
        if (res?.data?.code == 200) {
          try {
            const newList = JSON.parse(JSON.stringify(dashboardDayApiList));
            const checkData = newList?.book_data.findIndex(
              val => val.id == editQuickOpen.data.id,
            );
            newList.book_data.splice(checkData, 1);
            compareandCheckDates(newList, getDateList);
            dispatch(setDeleteAssetinDashboard(true));
            activeDashboardFunction();
            dispatch(getBookingAndNotificationCount());
            dispatch(updateBlinkIcon(true));
            dispatch(setDashboardListUpdate(true));
          } catch (error) { }
          closeEditDailogue();
        }
      },
    );
  };
  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'ant-picker-ranges',
        'ant-picker-time-panel-cell-inner',
        'ant-picker-now-btn',
        '',
        'ant-picker-ok',
        'btn cancel',
        'btn super-admin-delete-btn',
        'ant-btn ant-btn-primary ant-btn-sm',
        'ant-picker-time-panel',
        'modal-header',
        'modal-body',
        'main-modal-btns',
        'delete-info',
        'modal-content',
        'btn cancel edit',
        'ant-picker-cell-inner',
        'ant-picker-footer',
        'ant-picker-today-btn',
        'ant-picker-body',
        'ant-picker-header-view',
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
      ];
      if (list.includes(event.target.className)) {
      } else if (
        quickBookComponentRef?.current &&
        !quickBookComponentRef?.current?.contains(event.target) &&
        loading <= 0
      ) {
        dispatch(SetQuickBookEditOpen({ openState: false }));
        dispatch(setPlanPopup(false));
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const selectIcon = icon => {
    return icon === AssertIcon.PARKING
      ? ParkingIcon
      : icon === AssertIcon.WORKSPACE
        ? WorkspacesIcon
        : icon === AssertIcon.ROOM
          ? RoomIcon
          : icon === AssertIcon.OUT_OFFICE
            ? out_of_icon
            : icon === AssertIcon.IN_OFFICE
              ? inOffice
              : icon === AssertIcon.REMOTELY
                ? remote_home
                : icon === AssertIcon.HOLIDAY
                  ? holiday
                  : icon === AssertIcon.SICKNESS
                    ? sickness
                    : icon === AssertIcon.CLIENT_SITE
                      ? client_site
                      : icon === AssertIcon.OTHER
                        ? other_icon
                        : null;
  };
  const formattedDate = moment(editQuickOpen?.data?.booking_date).format(
    'ddd, Do MMMM, YYYY',
  );
  return (
    <>
      {editQuickOpen?.data != undefined ? (
        <div
          ref={quickBookComponentRef}
          className={`${'card book-card book-card-available quick-book-card quick-book-sidebar '}${editQuickOpen.openState === true && editQuickOpen?.data != undefined
              ? 'quick-book-sidebar-open'
              : ''
            }`}
        >
          {loadSpinner == true ? (
            <div className="quick-book-loader" style={{ marginTop: '400px' }}>
              <Loader />
            </div>
          ) : (
            <>
              <div className="quick-book-header quick-booking-header">
                <div className="sub-book-header">
                  <h4>
                    <Link
                      to="#"
                      className="clear-book"
                      onClick={handleEditBooking}
                    >
                      <i className="fas fa-angle-left" />
                    </Link>
                    {findLabelText(
                      LabelText.Edit_your_booking,
                      LabelText.Edityourbooking,
                      LabelText.dashboard,
                    )}
                  </h4>
                </div>
                {editQuickOpen?.data?.checkin_status == 0 && (
                  <Link
                    to="#"
                    className="delete-icon"
                    data-bs-toggle="modal"
                    onClick={() => setDeleteOpen(true)}
                    data-bs-target="#delete-modal"
                  >
                    <i className="feather-trash-2" />
                  </Link>
                )}
              </div>
              <div className="quick-book-edit-content">
                <h4>
                  <img
                    src={selectIcon(editQuickOpen?.data?.workspace_type)}
                    alt="icon"
                  />{' '}
                  {editQuickOpen?.data?.floorplan_type_id == AssertNumber.Id1 ||
                    editQuickOpen?.data?.floorplan_type_id == AssertNumber.Id2 ||
                    editQuickOpen?.data?.floorplan_type_id == AssertNumber.Id3
                    ? editQuickOpen?.data?.workspace_type
                    : editQuickOpen?.data?.workspace_name}
                </h4>
                <p>
                  {getUserPreferedDateFormat(editQuickOpen?.data?.booking_date)}
                </p>
                <p>{editQuickOpen?.data?.location_name}</p>
              </div>
              <div className="card-body">
                {editQuickOpen?.data && (
                  <QuickBookDaydetails
                    editDetails={editQuickOpen}
                    editRoomDetails={editData}
                    editBook={true}
                  />
                )}
              </div>
            </>
          )}
        </div>
      ) : null}
      {editQuickOpen.openState === true && (
        <DeleteConfirmationModal
          open={deleteOpen}
          cancel={() => {
            setDeleteOpen(false);
          }}
          confirm={() => {
            handleDeletUser();
          }}
          header={findLabelText(
            LabelText.DeleteEvent,
            LabelText.DeleteEvent,
            LabelText.dashboard,
          )}
          content={findLabelText(
            LabelText.allort,
            LabelText.allort,
            LabelText.dashboard,
          )}
        />
      )}
    </>
  );
};

export default EditBooking;
