import React, { useContext, useEffect, useRef, useState } from 'react';
import { BookingContext } from '../context/context';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { Search, bookLocation } from '../imagepath';
import LocationSelectorComponent from '../locationSelectorComponent';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import { ApiUrl } from '../../services/apiurl';
import { ViewByIds } from '../planModuleComponent/constants';

const BookLocationSelect = () => {
  const {
    viewBy,
    search,
    setSearch,
    setSelectedLocation,
    setTimeZone,
    setTimeZoneId,
  } = useContext(BookingContext);
  const { userDetails } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [locationList, setLocationList] = useState([]);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [defaultBuliding, setDefaultBuliding] = useState('');
  const [defaultFloor, setDefaultFloor] = useState('');
  const [floorId, setFloorId] = useState('');
  const [allLocation, setAllLocation] = useState<any>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [locationValue, setLocationValue] = useState<any>({});
  const [locationOption, setLocationOption] = useState<any>([]);
  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setLocationDropdown(false);
    }
  };

  useEffect(() => {
    getLocationList();
  }, []);
  useEffect(() => {
    const textsplit = userDetails?.location?.[0]?.name?.toString()?.split(',');
    setFloorId(userDetails?.location_id);
    setLocationValue(
      locationList?.find((i: any) => i?.value == userDetails?.location_id),
    );
    setDefaultBuliding(textsplit?.[0]);
    setDefaultFloor(textsplit?.[1]);
  }, [userDetails, locationList]);

  useEffect(() => {
    floorId && getTimezone(floorId);
  }, [floorId]);

  const getTimezone = id => {
    const payload = { location_id: id, type: 'encrypt' };
    postData(ApiUrl.getBuildingTimezone, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setTimeZone(data?.timezone);
        setTimeZoneId(data?.id);
      } else {
        setTimeZone(userDetails?.timezone);
        setTimeZoneId(userDetails?.timezone_id);
      }
    });
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const getLocationList = () => {
    dispatch(showLoader());
    postData(ApiUrl.bookingLocationlist, '', successRes => {
      dispatch(hideLoader());
      if (successRes?.List?.length > 0) {
        const list: any = [];
        for (const obj of successRes.List) {
          const preparData = obj;
          preparData['label'] = obj.name;
          preparData['value'] = obj.id;
          list.push(preparData);
        }
        setLocationList(list);
        if (list?.length > 0) {
          const selecLocation = list?.find(val => {
            if (val?.id == userDetails?.location_id) return val;
          });
          setSelectedLocation(
            selecLocation != undefined ? selecLocation : list?.[0],
          );
        }
      } else {
        setLocationList([]);
      }
    });
  };
  const splitTet1 = () => {
    return (
      <div className="location-booking location-booking-info me-0">
        <div className="booking-desk-details location-hierarchy">
          <h6>
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[0]
              : defaultBuliding}
          </h6>
          <p className="ms-2">
            {locationValue?.label
              ? locationValue?.label?.split(',')?.[1]
              : defaultFloor}
          </p>
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };
  return (
    <li>
      {viewBy == ViewByIds.team ? (
        <div className="filter-input find-input">
          <input
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
            type="text"
            className="input-filter"
            placeholder={findLabelText('Find', 'Find', 'Book')}
          />
          <div className="img-group">
            <Link to="#">
              <img src={Search} alt="img" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div
            className="change-quick-book-header location-change-header shadow-none mb-0 pb-0"
            onClick={() => setLocationDropdown(true)}
          >
            {splitTet1()}
          </div>
          <div
            className={`global-search-section global-search-section-info ${
              locationDropdown ? 'd-block' : 'd-none'
            }`}
            ref={dropdownRef}
          >
            <LocationSelectorComponent
              locationId={userDetails?.location_id}
              locationNames={userDetails?.location?.[0]?.name}
              setDefaultFloor={setDefaultFloor}
              setDefaultBuliding={setDefaultBuliding}
              handleLocationChange={val => {
                setFloorId(val);
                setLocationValue(
                  locationList?.find((i: any) => i.value == val),
                );
                setSelectedLocation(
                  locationList?.filter(
                    (item: any) => item?.id == val && item,
                  )?.[0],
                );
              }}
              floorId={floorId}
              setLocationDropdown={setLocationDropdown}
              setTimeZone={e => {}}
              setAllLocation={setAllLocation}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default BookLocationSelect;
