import React, { useContext, useEffect, useRef, useState } from "react";
import { BookingContext } from "../context/context";
import { findLabelText } from "../commonMethod";
import { Link } from "react-router-dom";
import { Search, bookLocation } from "../imagepath";
// import LocationSelectorComponent from "../locationSelectorComponent";
import LocationSelectorComponent from "../../components/reporting/dashboardLocationSelectorComponent";

import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reduxStore/appSlice";
import { postData } from "../../services/apicall";
import { ApiUrl } from "../../services/apiurl";
import { ViewByIds } from "../planModuleComponent/constants";

const BookLocationSelect = (props:any) => {
    
    const {locationSelectId,setLocationSelectId,locationSelectLevel,setLocationSelectLevel,
      setInitialLocationSelectId,setInitialLocationSelectLevel,setResetDefaultBuliding,setResetDefaultFloor,initialValue,
      initialLocationSelectId,
      initialLocationSelectLevel,
      resetDefaultBuliding,
      resetDefaultFloor
    }=props

  const { viewBy, search, setSearch, setSelectedLocation } =
    useContext(BookingContext);
  const { userDetails } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const [locationList, setLocationList] = useState([]);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [defaultBuliding, setDefaultBuliding] = useState("");
  const [defaultFloor, setDefaultFloor] = useState("");

  const [floorId, setFloorId] = useState("");
  const [allLocation, setAllLocation]= useState<any>([]);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = (event) => {
    const element = event.target.className; // Replace with your element's ID or a reference

     if (element!="ms-2" && element!="dropDownCloseLocation" && element!="" && element!="day-info" && element!="booking-location-date booking-location-box" && element!="location-booking location-booking-info me-0" && element!="booking-location-date booking-location-region" &&  element!="card-body scroll-body booking-card-body p-0") {
      setLocationDropdown(false);
    }
  };

  
  useEffect(() => {
    if(initialValue){
     
   setLocationSelectId(initialLocationSelectId)
    setLocationSelectLevel(initialLocationSelectLevel)
    
      setDefaultBuliding(resetDefaultBuliding)
    
    setDefaultFloor(resetDefaultFloor)
     
    }
   
  }, [initialValue]);

  useEffect(() => {
    getLocationList();
    const textsplit = userDetails?.location?.[0]?.name?.toString()?.split(",");
    setFloorId(userDetails?.location_id);
    setDefaultBuliding(textsplit?.[0]);
    setDefaultFloor(textsplit?.[1]);
    setResetDefaultBuliding(textsplit?.[0]);
    setResetDefaultFloor(textsplit?.[1]);

  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const getLocationList = () => {
    dispatch(showLoader());
    postData(ApiUrl.bookingLocationlist, "", (successRes) => {
      dispatch(hideLoader());
      if (successRes?.List?.length > 0) {
        const list: any = [];
        for (const obj of successRes.List) {
          const preparData = obj;
          preparData["label"] = obj.name;
          preparData["value"] = obj.id;
          list.push(preparData);
        }
        setLocationList(list);
        if (list?.length > 0) {
          const selecLocation = list?.find((val) => {
            if (val?.id == userDetails?.location_id) return val;
          });
          setSelectedLocation(
            selecLocation != undefined ? selecLocation : list?.[0]
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
          <h6 className="dropDownCloseLocation">{defaultBuliding}</h6>
          <p className="ms-2">{defaultFloor}</p>
        </div>
        <span>
          <Link to="#" >
            <img src={bookLocation} alt="img" className="dropDownCloseLocation"/>
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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            className="input-filter"
            placeholder={findLabelText("Find", "Find", "Book")}
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
            onClick={() => setLocationDropdown(!locationDropdown)}
          >
            {splitTet1()}
          </div>
          <div
            className={`global-search-section global-search-section-info ${
              locationDropdown ? "d-block" : "d-none"
            }`}
            ref={dropdownRef}
          >
            <LocationSelectorComponent
              locationId={userDetails?.location_id}
              locationNames={userDetails?.location?.[0]?.name}
              setDefaultFloor={setDefaultFloor}
              setDefaultBuliding={setDefaultBuliding}
              handleLocationChange={(val) => {
                setFloorId(val);
                // setSelectedLocation(
                //   locationList?.filter(
                //     (item: any) => item?.id == val && item
                //   )?.[0]
                // );
              }}
              floorId={floorId}
              setLocationDropdown={setLocationDropdown}
              setTimeZone={(e) => {}}
              setAllLocation={setAllLocation}

              locationSelectId={locationSelectId}
              setLocationSelectId={setLocationSelectId}
              locationSelectLevel={locationSelectLevel}
              setLocationSelectLevel={setLocationSelectLevel}
              setFloorId={setFloorId}
              setInitialLocationSelectId={setInitialLocationSelectId}
              setInitialLocationSelectLevel={setInitialLocationSelectLevel}
              initialValue={initialValue}
              resetDefaultBuliding={resetDefaultBuliding}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default BookLocationSelect;
