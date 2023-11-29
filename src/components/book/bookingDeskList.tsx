import React, { useContext } from 'react';
import {
  getAssetStatusName,
  getBookingStatusName,
  getWorkplaceStatusName,
  validateBackgroundColor,
} from '../commonMethod';
import { listOfBoxStyle } from '../../assets/constants/config';
import { bookingNameIconTwo } from '../imagepath';
import { BookingContext } from '../context/context';
import { useSelector } from 'react-redux';
import { BookingStatus, ViewByIds } from '../planModuleComponent/constants';

interface BookingDeskListProps {
  onSelect: CallableFunction;
  onSelectClick: CallableFunction;
  setVisible: CallableFunction;
  showPopup: CallableFunction;
  viewBy: string;
  assetDetails: any;
  monthDetails: any;
  bookingDetailList: any;
  teamDetails: any;
  teamBookingDetails: any;
  date: any;
  details: any;
  isTeam: boolean;
  teamCount: number | any;
  assetCount: number | any;
}

export const BookingDeskList: React.FC<BookingDeskListProps> = ({
  assetDetails,
  onSelect,
  details,
  onSelectClick,
  setVisible,
  showPopup,
  viewBy,
  bookingDetailList,
  monthDetails,
  teamDetails,
  teamBookingDetails,
  isTeam,
  teamCount,
  assetCount,
}) => {
  const { selectedTab, setSelectedTab } = useContext(BookingContext);
  const { userDetails } = useSelector((state: any) => state.app);
  const count = viewBy == ViewByIds.team ? teamCount : assetCount;

  const getBookingDetail = () => {
    const bookList = bookingDetailList?.filter(
      book => book?.booking_date == monthDetails?.full_date,
    );
    if (bookList?.length > 0) {
      const checkData = bookList?.find(i => i?.user_id == userDetails?.id);
      if (checkData) return checkData;
      else return bookList?.[0];
    }
  };
  const bookingDetails = getBookingDetail();

  const getBoxStatus = () => {
    if (viewBy == ViewByIds.team) {
      if (isTeam) {
        return getAssetStatusName('1');
      } else {
        if (teamBookingDetails != undefined && teamBookingDetails != null) {
          return getWorkplaceStatusName(teamBookingDetails?.work_place);
        } else {
          return getWorkplaceStatusName('7'); // unknown
        }
      }
    } else {
      if (bookingDetails != undefined && bookingDetails != null) {
        switch (bookingDetails?.booking_status?.toString()) {
          case '1': {
            if (bookingDetails?.user_id == userDetails?.id)
              return getBookingStatusName('2'); // Booked by me
            else return getBookingStatusName('1'); // Booked
          }
          case '4': {
            if (bookingDetails?.user_id == userDetails?.id)
              return getBookingStatusName('4'); // Requested by me
            else return getAssetStatusName(assetDetails?.asset_status); // asset status
          }
        }
      } else {
        return getAssetStatusName(assetDetails?.asset_status);
      }
    }
  };

  const validateBoxColor = statusName => {
    if (statusName) {
      for (const obj of listOfBoxStyle) {
        if (obj?.status == statusName) {
          return obj?.calssName;
        }
      }
    }
  };

  const getClickDetails = () => {
    if (viewBy == ViewByIds.team) {
      const teamObj = {
        status: getBoxStatus(),
        full_date: monthDetails?.full_date,
        userDetails: {
          id: details?.id,
          name: details?.name,
          profile_photo: details?.profile_image,
          health_safety_icons: details?.health_safety,
        },
        assetDetails: {
          parent_name:
            teamBookingDetails?.plan_id?.[0]?.location_info?.parent_name?.[0]
              ?.name,
          deskname: teamBookingDetails?.plan_id?.[0]?.location_info?.name,
          start_time: teamBookingDetails?.start_time,
          end_time: teamBookingDetails?.end_time,
          amenities: teamBookingDetails?.plan_id?.[0]?.amenities,
        },
      };
      return teamObj;
    } else {
      const assetObj = {
        status: getBoxStatus(),
        status_id: assetDetails?.asset_status,
        full_date: monthDetails?.full_date,
        booking_id: bookingDetails?.booking_id,
        booking_user_id: bookingDetails?.user_id,
        assetDetails: {
          id: assetDetails?.asset_id,
          description: assetDetails?.asset_description,
          amenities: assetDetails?.amenities,
          capacity: assetDetails?.asset_capacity,
          name: assetDetails?.asset_name,
        },
      };
      return assetObj;
    }
  };

  const text = details => {
    return (
      <div>
        <p className="m-0">
          <strong>Status:</strong>
        </p>
        <p className="m-0"> {getBoxStatus()}</p>
        <p className="m-0">
          <strong>Description: </strong>
        </p>
        <p className="m-0">{details?.asset_description}</p>
        <div className="booking-desk-list m-0">
          <strong>Asset:</strong>
          <ul className="nav">
            {details?.amenities?.length > 0
              ? details?.amenities?.map(item => {
                  return <li key={item?.id}>{item?.name}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    );
  };
  const pastDateToHideCurser = { pointerEvents: 'none' };
  const cursorShowCurrentWithFutureDate = {
    pointerEvents: validateBackgroundColor(monthDetails?.full_date, 'pointer'),
  };
  return (
    // <Tooltip placement="right" title={assetDetails ? text(assetDetails) : null}>
    <div
      onMouseOver={() => {
        const debounce = setTimeout(() => {
          setVisible(true);
        }, 500);
        return () => clearTimeout(debounce);
      }}
      onMouseLeave={() => {
        const debounce = setTimeout(() => {
          // setVisible(false);
        }, 500);
        return () => clearTimeout(debounce);
      }}
    >
      <div
        onFocus={() => void 0}
        onMouseOver={() => onSelect(getClickDetails())}
        onMouseLeave={() => {}}
        className="booking-details-btns"
      >
        {getBoxStatus() === 'Requested by me' ? (
          <div
            className={validateBoxColor(getBoxStatus())}
            style={{ border: 'none' }}
          >
            <img
              className="booking-pending-name-image"
              src={bookingNameIconTwo}
              alt="img"
            />
          </div>
        ) : (
          <button
            onClick={() => {
              if (
                bookingDetails != undefined &&
                bookingDetails != null &&
                (bookingDetails?.booking_status == BookingStatus.BOOKED ||
                  (bookingDetails?.booking_status == BookingStatus.PENDING &&
                    bookingDetails?.user_id == userDetails?.id))
                // bookingDetails?.booking_id && bookingDetails?.user_id != userDetails?.id
              ) {
              } else {
                if (selectedTab?.id == 2) {
                  if (viewBy == ViewByIds.team) {
                  } else {
                    showPopup(true);
                  }
                }
                onSelectClick(getClickDetails());
              }
            }}
            className={validateBoxColor(getBoxStatus())}
            style={
              bookingDetails != undefined &&
              bookingDetails != null &&
              (bookingDetails?.booking_status == BookingStatus.BOOKED ||
                (bookingDetails?.booking_status == BookingStatus.PENDING &&
                  bookingDetails?.user_id == userDetails?.id))
                ? pastDateToHideCurser
                : cursorShowCurrentWithFutureDate
            }
          >
            {count}
          </button>
        )}
      </div>
    </div>
    // </Tooltip>
  );
};
