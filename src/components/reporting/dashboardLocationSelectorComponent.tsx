import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { postData } from "../../services/apicall";
import {
  Floorbox_1,
  Floorbox_2,
  Floorbox_3,
  Shard,
  city,
  country,
  global,
  region,
  state,
  street,
  suburb,
} from "../imagepath";
import Loader from "../loader";
import {
  HrGetOverallLocationlist,
  LocationListAPi,
  getOverallLocationlist,
} from "../../services/apiurl";
import { hideLoader, showLoader } from "../../reduxStore/appSlice";
import { LocationSelectorDropDownDashboardProps } from "../../assets/globals/typeConstants";

const LocationSelectorComponent = (props: LocationSelectorDropDownDashboardProps) => {
  const {
    locationId,
    floorId,
    setFloorId,
    locationNames,
    setDefaultBuliding,
    setDefaultFloor,
    handleLocationChange,
    setLocationDropdown,
    setTimeZone,
    setAllLocation,
    setLocation,
    isHrModule,
    locationSelectId,
    setLocationSelectId,
    locationSelectLevel,
    setLocationSelectLevel,
    setInitialLocationSelectId,
    setInitialLocationSelectLevel,
    initialValue,
    resetDefaultBuliding
  } = props;
  const dispatch = useDispatch();
  const [locationChange, setLocationChange] = useState<any>("");
  const [selectChange, setSelectChange] = useState<any>("");
 
  const [locationValue, setLocationValue] = useState<any>();
  const [defaultValue, setDefaultValue] = useState<any>();
  const [initialLocationPath, setInitialLocationPath] = useState<any>([]);
  const [locationPath, setLocationPath] = useState<any>([]);
  const [locationPaths, setLocationPaths] = useState<any>([]);
  const [changeHierarchy, setChangeHierarchy] = useState(null);
  const [changed, setChanged] = useState([]);
  const [initialChanged, setInitialChanged] = useState([]);
  const [loader, setLoader] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationSelectName, setLocationSelectName] = useState("");
  const [totalHierarchy, setTotalHierarchy] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [slowSmallLocationLoader, setSlowSmallLocationLoader] = useState(false);
  const [locationValues, setLocationValues] = useState([]);
  
  const [tempdefaultBuliding, setTempdefaultBuliding] = useState("");
  const [tempdefaultFloor, setTempdefaultFloor] = useState("");
  const [tempLocationId, setTempLocationId] = useState("");
  const [tempLocationLevel, setTempLocationLevel] = useState<any>("");

useEffect(() => {
  if(initialValue){

    setTempdefaultBuliding("");
    setTempdefaultFloor("");
    setTempLocationId("");
    setTempLocationLevel("");
    setSelectChange(resetDefaultBuliding);
    setLocationChange(resetDefaultBuliding);
    setLocationPath(initialLocationPath);
    setChanged(initialChanged);
   
  }
 
}, [initialValue]);

  const handleSelectChange = () => {
    setLocationSelectId(tempLocationId)
    setLocationSelectLevel(tempLocationLevel)
    if(tempdefaultBuliding!=''){
      setDefaultBuliding(tempdefaultBuliding)
    }
    setDefaultFloor(tempdefaultFloor)
     setLocationDropdown(false);
    
     }
     
    const handleSelectCancel = () => {
      
       setLocationDropdown(false);
      
       }
     

  const handleLocationPage = () => {
    setLocationValue(locationId);
    dispatch(showLoader());
    postData(
      getOverallLocationlist,
      {
        location_id: locationId ? locationId : floorId ? floorId : null,
      },
      getResponse
    );
  };
  const getResponse = (data, res) => {
    dispatch(hideLoader());
    setTotalHierarchy(data != "No data" ? data : []);
  };

  useEffect(() => {
    locationId && handleLocationPage();
  }, [locationId]);

  useEffect(() => {
    const defaultLocation = {
      label: locationNames,
      value: "",
    };
    setDefaultValue(defaultLocation);
    setLocationSelectName(locationNames);
  }, [locationNames]);

  const findPath = (arr, targetId) => {
    let path = [];
    const find = (arr, targetId) => {
      return arr?.reduce((acc, item) => {
        if (item.id == targetId) {
          return [item];
        } else if (item.children) {
          const childPath = find(item.children, targetId);
          if (childPath.length > 0) {
            return [item, ...childPath];
          }
        }
        return acc;
      }, []);
    };

    path = find(arr?.length > 0 ? arr : [], targetId);
    return path;
  };
  const findPaths = (arr, targetId) => {
    let path = [];
    const find = (arr, targetId) => {
      return arr?.reduce((acc, item) => {
        if (item.id == targetId) {
          return [item.location_name];
        } else if (item.children) {
          const childPath = find(item.children, targetId);
          if (childPath.length > 0) {
            return [item.location_name, ...childPath];
          }
        }
        return acc;
      }, []);
    };
    path = find(arr?.length > 0 ? arr : [], targetId);
    return path;
  };
  useEffect(() => {
    const result = findPath(
      totalHierarchy?.length > 0 ? totalHierarchy : [],
      changeHierarchy
        ? changeHierarchy
        : locationId
        ? locationId
        : floorId
        ? floorId
        : null
    );
    const results = findPaths(
      totalHierarchy?.length > 0 ? totalHierarchy : [],
      changeHierarchy
        ? changeHierarchy
        : locationId
        ? locationId
        : floorId
        ? floorId
        : null
    );
    const change = result.pop();
    const arr: any = [];
    arr.push(change);
    setChanged(arr);
    setInitialChanged(arr);
    setLocationPath(result);
    setInitialLocationPath(result);
    setLocationChange(result[result?.length - 1]?.location_name);
    setSelectChange(result[result?.length - 1]?.location_name);
    

     if(floorId==''){
    
      setLocationSelectId(result[result?.length - 1]?.id);
      setLocationSelectLevel(result[result?.length - 1]?.level);
      setInitialLocationSelectId(result[result?.length - 1]?.id)
      setInitialLocationSelectLevel(result[result?.length - 1]?.level);
     }else{
      setLocationSelectId(floorId)
     setLocationSelectLevel('Floor');
      setInitialLocationSelectId(floorId)
      setInitialLocationSelectLevel('Floor');

    }
    setLocationPaths(results);
  }, [totalHierarchy, changeHierarchy]);

  let assetImg;
  const findImg = (name) => {
    switch (name) {
      case "Global":
        assetImg = global;
        break;
      case "Region":
        assetImg = region;
        break;
      case "Country":
        assetImg = country;
        break;
      case "State":
        assetImg = state;
        break;
      case "City":
        assetImg = city;
        break;
      case "Suburb":
        assetImg = suburb;
        break;
      case "Street":
        assetImg = street;
        break;
      case "Building":
        assetImg = Shard;
        break;

      default:
        break;
    }
    return assetImg;
  };

  const handleLocation = (type) => {
    locationList?.length > 0 ? {} : setLoader(true);
    let filters;
    switch (type) {
      case "Global":
        filters = 0;
        break;
      case "Region":
        filters = 1;
        break;
      case "Country":
        filters = 2;
        break;
      case "State":
        filters = 3;
        break;
      case "City":
        filters = 4;
        break;
      case "Suburb":
        filters = 5;
        break;
      case "Street":
        filters = 6;
        break;
      case "Building":
        filters = 7;
        break;

      default:
        break;
    }
    locationList?.length > 0
      ? {}
      : postData(
          LocationListAPi,
          { filter_id: filters, type: "location_selector" },
          (data, res) => {
            setLoader(false);
            setLocationList(data?.List);
            setSelectChange('Global')

          }
        );
  };

  return (
    <>
      {/* <form className="change-popup change-popup-inner choose-workspace choose-workspace-inner"> */}
      <form
        action="#"
        className="change-popup change-popup-inner choose-workspace choose-workspace-inner"
      >
        <div className="card-body scroll-body booking-card-body p-0">
          <div className="day-info">
            <div className="booking-date-grid booking-date-grid-info">
              <div className="quick-book-location">
                <div className="book-location-info">
                  <div
                    className={`booking-location-date booking-location-change ${
                      locationChange == "Global" ? "" : "border-0"
                    }`}
                  >
                    <Link
                      to="#"
                      onClick={() => {
                        setLocationChange("Global");
                        setSelectChange("Global");
                        setLocationPath([]);
                        setAllLocation && setAllLocation([]);
                        handleLocation("Global");
                        setTempdefaultBuliding("Global");
                        setTempdefaultFloor("");
                        setTempLocationId(null);
                        setTempLocationLevel(0);

                        setLocation && setLocation(true);
                        setErrorMsg("");
                      }}
                    >
                      <img src={global} alt="img" /> <span>Global</span>
                    </Link>
                  </div>
                  <ul
                    className={
                      locationChange == "Global" ? "d-block" : "d-none"
                    }
                  >
                    {loader && <Loader />}
                    {locationList?.length > 0 &&
                      locationList?.map((item: any, index) => {
                        return (
                          <div
                            className="booking-location-date booking-location-region"
                            key={index}
                          >
                            <Link
                              to="#"
                              onClick={() => {
                          
                                try {
                                  setSlowSmallLocationLoader(true);
                                  postData(
                                    LocationListAPi,
                                    {
                                      filter_id: item.id,
                                      type: "location_selector",
                                    },
                                    (data, res) => {
                                      
                                      setSlowSmallLocationLoader(false);
                                      const getitem = { ...item };

                                      getitem["level"] = item?.location_type
                                        ? item.location_type
                                        : item.level;
                                      getitem["location_name"] = item?.name
                                        ? item.name
                                        : item.location_name;
                                      const childList: any = [];
                                      if (
                                        data !== undefined &&
                                        data?.List?.length > 0
                                      ) {
                                        for (const obj of data.List) {
                                          obj["level"] = obj.location_type;
                                          obj["location_name"] = obj.name;
                                          childList.push(obj);
                                        }
                                      } else {
                                        setErrorMsg("No data Available");
                                      }

                                      getitem["children"] = childList;

                                      const list: any = [];
                                      list.push(getitem);
                                      setLocationPath([...list]);
                                    }
                                  );
                                  setLocationChange(item.name);
                                  setSelectChange(item.location_type)
                                  
                                  setTempdefaultBuliding(item.name);
                                  setTempdefaultFloor("");
                                  setTempLocationId(item.id);
                                  setTempLocationLevel(item.location_type);
                                 
                                  item?.location_type == "Building"
                                    ? (setDefaultBuliding(item?.name),
                                      setTimeZone(item?.timezone))
                                    : "";
                                } catch (e) {}
                              }}
                            >
                              <span>
                                {item?.name}
                                {" ("}
                                {item?.location_type}
                                {")"}
                              </span>
                            </Link>
                          </div>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            {locationPath?.length > 0 &&
              locationPath.map((name: any, ind) => {
                const level = name?.location_type
                  ? name?.location_type
                  : name?.level;
                return (
                  <div className="quick-book-location" key={ind}>
                    <div className="book-location-grid booking-location-grid-info">
                      <div className="book-location-info">
                        <div
                          className={`booking-location-date booking-location-change ${
                            name?.children?.length > 0 &&
                            locationChange == name?.location_name
                              ? ""
                              : "border-0"
                          }`}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                             
                              try {
                                setLocationChange(name?.location_name);
                                setSelectChange(name?.level)
                                setTempdefaultBuliding(name?.location_name);
                                setTempdefaultFloor("");

                                setTempLocationId(name.id);
                                  setTempLocationLevel(name.level);
                                  setFloorId('');
                                const getitem = { ...name };
                                const list: any = [];
                                list.push(getitem);
                                const getLocationPathCopy = [...locationPath];
                                getLocationPathCopy.splice(ind + 1);
                                setLocationPath([...getLocationPathCopy]);
                              } catch (e) {}
                            }}
                          >
                            <img src={findImg(name?.level)} alt="img" />{" "}
                            <span>
                              {name?.location_name}
                              {level ? " (" + level + ")" : ""}
                            </span>
                          </Link>
                        </div>
                        <ul
                          className={
                            name?.children?.length > 0 &&
                            locationChange == name?.location_name
                              ? "d-block"
                              : "d-none"
                          }
                        >
                          {name?.level == "Building" ? (
                            <div className="booking-location-date booking-location-box">
                              <div className="booking-inner-box">
                                <p>
                                  <img src={Floorbox_1} alt="img" />
                                </p>
                                {name?.children?.map((floor, id) => {
                                
                                  return (
                                    <p key={id}>
                                      <Link
                                        to="#"
                                        title={floor?.location_name}
                                        onClick={() => {
                                      
                                          handleLocationChange(floor?.id);
                                          setLocationDropdown(true);
                                          setDefaultFloor(floor?.location_name);
                                            setSelectChange(floor?.location_name);
                                            
                                            setTempLocationId(floor.id);
                                            setTempLocationLevel(floor.level);
                                  
                                            
                                           // setTempdefaultBuliding(floor?.location_name);
                                            setTempdefaultFloor(floor?.location_name);
                                          
                                          const labelName =
                                            name?.location_name +
                                            ", " +
                                            floor?.location_name;
                                          const preparData = {
                                            label: labelName,
                                            value: floor?.id,
                                          };
                                          setLocationValue(preparData);
                                          setDefaultValue(preparData);
                                          setAllLocation &&
                                            setAllLocation(locationPath);
                                        }}
                                        className={
                                          floorId == floor?.id ||
                                          (floorId == null &&
                                            locationPaths?.includes(
                                              floor?.location_name
                                            ))
                                            ? "fw-bold"
                                            : ""
                                        }
                                      >
                                        <img
                                          src={
                                            floorId == floor?.id ||
                                            (floorId == null &&
                                              locationPaths?.includes(
                                                floor?.location_name
                                              ))
                                              ? Floorbox_2
                                              : Floorbox_1
                                          }
                                          alt="img"
                                        />{" "}
                                        <span className="charLenth">{floor?.location_name}</span>
                                      </Link>
                                    </p>
                                  );
                                })}
                                <p>
                                  <img src={Floorbox_1} alt="img" />
                                </p>
                              </div>
                            </div>
                          ) : (
                            name?.children?.map((val, num) => {
                                
                              return (
                                <div
                                  className="booking-location-date booking-location-region"
                                  key={num}
                                >
                                  <span
                                    className={
                                      locationPaths?.includes(
                                        val?.location_name
                                      )
                                        ? "fw-bold"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                      
                                        setSlowSmallLocationLoader(true);
                                        postData(
                                          LocationListAPi,
                                          {
                                            filter_id: val.id,
                                            type: "location_selector",
                                          },
                                          (data, res) => {
                                            setSlowSmallLocationLoader(false);
                                            
                                            const getitem = { ...val };
                                          
                                            getitem["level"] =
                                              val?.location_type
                                                ? val.location_type
                                                : val.level;
                                            getitem["location_name"] = val?.name
                                              ? val.name
                                              : val.location_name;
                                            const childList: any = [];
                                            if (
                                              data !== undefined &&
                                              data?.List?.length > 0
                                            ) {
                                              for (const obj of data.List) {
                                                obj["level"] =
                                                  obj.location_type;
                                                obj["location_name"] = obj.name;
                                                childList.push(obj);
                                              }
                                            } else {
                                              setErrorMsg("No data Available");
                                            }

                                            getitem["children"] = childList;

                                            const list: any = [];
                                            list.push(getitem);

                                            const getLocationPathCopy = [
                                              ...locationPath,
                                            ];
                                            getLocationPathCopy.splice(ind + 1);
                                            setLocationPath([
                                              ...getLocationPathCopy,
                                              ...list,
                                            ]);
                                          }
                                        );
                                       
                                        setLocationChange(val.location_name);
                                        setSelectChange(val.level)
                                        
                                        setTempdefaultBuliding(val.location_name);
                                        setTempdefaultFloor("");

                                        setTempLocationId(val.id);
                                        setTempLocationLevel(val.level);
                                        
                                        val?.level == "Building"
                                          ? (setDefaultBuliding(
                                              val?.location_name
                                            ),
                                            setTimeZone(val?.timezone))
                                          : "";
                                        val?.level == "Building" &&
                                          setAllLocation &&
                                          setAllLocation(locationPath);
                                      }}
                                    >
                                      {val?.location_name}({val?.level})
                                    </Link>
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}

            {slowSmallLocationLoader && <Loader />}

            {changed?.map((name: any, ind) => {
              return (
                <div
                  className={`quick-book-location ${
                    changeHierarchy == null ? "d-none" : "d-block"
                  }`}
                  key={ind}
                >
                  <div className="book-location-grid booking-location-grid-info">
                    <div className="book-location-info">
                      <div
                        className={`booking-location-date booking-location-change ${
                          name?.children?.length > 0 &&
                          locationChange == name?.location_name
                            ? ""
                            : "border-0"
                        }`}
                      >
                        <Link
                          to="#"
                          onClick={() => setLocationChange(name?.location_name)}
                        >
                          <img src={findImg(name?.level)} alt="img" />{" "}
                          <span>{name?.location_name}</span>
                        </Link>
                      </div>
                      <ul
                        className={
                          name?.children?.length > 0 &&
                          locationChange == name?.location_name
                            ? "d-block"
                            : "d-none"
                        }
                      >
                        {name?.level == "Building" ? (
                          <div className="booking-location-date booking-location-box">
                            <div className="booking-inner-box">
                              <p>
                                <img src={Floorbox_1} alt="img" />
                              </p>
                              {name?.children?.map((floor, id) => {
                               
                                return (
                                  <p key={id}>
                                    <Link
                                      to="#"
                                      title={floor?.location_name}                                      
                                      onClick={() => {
                                      
                                        setLocationDropdown(false);
                                        handleLocationChange(floor?.id);
                                        setAllLocation &&
                                          setAllLocation(locationPath);
                                      }}
                                      className={
                                        floorId == floor?.id ? "fw-bold" : ""
                                      }
                                    >
                                      <img
                                        src={
                                          floorId == floor?.id
                                            ? Floorbox_2
                                            : Floorbox_1
                                        }
                                        alt="img"
                                      />{" "}
                                     
                                      <span className="charLenth">{floor?.location_name}</span>
                                    </Link>
                                  </p>
                                );
                              })}
                              <p>
                                <img src={Floorbox_1} alt="img" />
                              </p>
                            </div>
                          </div>
                        ) : (
                          name?.children?.map((val: any, num) => {
                            return (
                              <div
                                className="booking-location-date booking-location-region"
                                key={num}
                              >
                                <span
                                  className={
                                    locationPaths?.includes(val?.location_name)
                                      ? "fw-bold"
                                      : ""
                                  }
                                >
                                  <Link
                                    to="#"
                                    onClick={() => {
                                     
                                      setChangeHierarchy(val?.id);
                                      setLocationChange(name?.location_name);
                                      setSelectChange(name?.location_name)
                                    }}
                                  >
                                    {val?.location_name}({val?.level})
                                  </Link>
                                </span>
                              </div>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between locsection-footer align-items-start">
            <Link to="#" className="cancel-btn-trans" onClick={() => { handleSelectCancel() }}>Cancel</Link>
            <div className="d-flex align-items-start">
              <div className="locsection-selected d-flex pe-2">
                <span>Your current selection is:</span>
                <span>{selectChange}</span>
              </div>
             
              <Link to="#" className="btn btn-primary" onClick={() => {
                    handleSelectChange();
              }}>Select</Link>
            </div>
            </div>
            <div className="d-flex justify-content-center">
              <p style={{ color: "red" }}>{errorMsg}</p>
            </div>
          </div>
        </div>
      </form>
      {/* </form> */}
    </>
  );
};

export default React.memo(LocationSelectorComponent);
