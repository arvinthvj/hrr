import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postData } from '../../services/apicall';
import {
  Floorbox_1,
  Floorbox_2,
  Shard,
  bookLocation,
  city,
  country,
  global,
  region,
  state,
  street,
  suburb,
} from '../imagepath';
import Loader from '../loader';
import { LocationListAPi, getOverallLocationlist } from '../../services/apiurl';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { findLabelText } from '../commonMethod';
import { LocationTypes, QuickbookLabels } from './constant';

const LocationSelector = ({
  setLocationpage,
  selectedAsset,
  setFloorId,
  floorId,
  setUTCFormat,
  gotoGlobal,
  setGotoGlobal,
  setInitial,
  setTimeZone,
  editWorkspaces,
}) => {
  const dispatch = useDispatch();
  const [locationChange, setLocationChange] = useState<any>('');
  const [locationValue, setLocationValue] = useState<any>();
  const [defaultValue, setDefaultValue] = useState<any>();
  const [defaultBuliding, setDefaultBuliding] = useState('');
  const [defaultFloor, setDefaultFloor] = useState('');
  const [locationPath, setLocationPath] = useState<any>([]);
  const [locationPaths, setLocationPaths] = useState<any>([]);
  const [changeHierarchy, setChangeHierarchy] = useState(null);
  const [changed, setChanged] = useState([]);
  const [loader, setLoader] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [locationSelectName, setLocationSelectName] = useState('');
  const [totalHierarchy, setTotalHierarchy] = useState([]);
  const [slowSmallLocationLoader, setSlowSmallLocationLoader] = useState(false);
  const splitTet1 = () => {
    const textsplit = locationSelectName?.toString()?.split(',');
    const buildingName =
      textsplit?.length > 0 && textsplit[0] != ''
        ? textsplit[0]
        : defaultBuliding;
    const floorName = textsplit?.length > 1 ? textsplit[1] : defaultFloor;
    return (
      <div
        className="location-booking mb-0 mt-2"
        style={{ padding: '8px 15px' }}
      >
        <div className="booking-desk-details location-hierarchy">
          <h6>{buildingName}</h6>
          <p className="ms-2">{floorName}</p>
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };
  const handleLocationPage = () => {
    setLocationValue(selectedAsset?.location_id);
    setLocationpage(true);
    dispatch(showLoader());
    postData(
      getOverallLocationlist,
      {
        location_id: selectedAsset?.location_id
          ? selectedAsset?.location_id
          : floorId
          ? floorId
          : null,
      },
      getResponse,
    );
  };
  const getResponse = (data, res) => {
    dispatch(hideLoader());
    setTotalHierarchy(data != 'No data' ? data : []);
  };

  useEffect(() => {
    selectedAsset?.location_id && handleLocationPage();
  }, [selectedAsset]);

  useEffect(() => {
    const defaultLocation = {
      label: selectedAsset?.location_name,
      value: '',
    };
    setDefaultValue(defaultLocation);
    setLocationSelectName(selectedAsset?.location_name);
  }, [selectedAsset]);

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
    const result: any = findPath(
      totalHierarchy?.length > 0 ? totalHierarchy : [],
      changeHierarchy
        ? changeHierarchy
        : selectedAsset?.location_id
        ? selectedAsset?.location_id
        : floorId
        ? floorId
        : null,
    );
    const results = findPaths(
      totalHierarchy?.length > 0 ? totalHierarchy : [],
      changeHierarchy
        ? changeHierarchy
        : selectedAsset?.location_id
        ? selectedAsset?.location_id
        : floorId
        ? floorId
        : null,
    );
    const change = result.pop();
    const arr: any = [];
    arr.push(change);
    setChanged(arr);
    setLocationPath(result);
    setLocationChange(result[result?.length - 1]?.location_name);
    setLocationPaths(results);
  }, [totalHierarchy, changeHierarchy]);
  let assetImg;
  const findImg = name => {
    switch (name) {
      case LocationTypes.global:
        assetImg = global;
        break;
      case LocationTypes.region:
        assetImg = region;
        break;
      case LocationTypes.country:
        assetImg = country;
        break;
      case LocationTypes.state:
        assetImg = state;
        break;
      case LocationTypes.city:
        assetImg = city;
        break;
      case LocationTypes.suburb:
        assetImg = suburb;
        break;
      case LocationTypes.street:
        assetImg = street;
        break;
      case LocationTypes.building:
        assetImg = Shard;
        break;
      default:
        break;
    }
    return assetImg;
  };

  const handleLocation = type => {
    locationList?.length > 0 ? {} : setLoader(true);
    let filters;
    switch (type) {
      case LocationTypes.global:
        filters = 0;
        break;
      case LocationTypes.region:
        filters = 1;
        break;
      case LocationTypes.country:
        filters = 2;
        break;
      case LocationTypes.state:
        filters = 3;
        break;
      case LocationTypes.city:
        filters = 4;
        break;
      case LocationTypes.suburb:
        filters = 5;
        break;
      case LocationTypes.street:
        filters = 6;
        break;
      case LocationTypes.building:
        filters = 7;
        break;
      default:
        break;
    }
    locationList?.length > 0
      ? {}
      : postData(
          LocationListAPi,
          { filter_id: filters, type: 'location_selector' },
          (data, res) => {
            setLoader(false);
            setLocationList(data?.List);
          },
        );
  };
  useEffect(() => {
    if (gotoGlobal) {
      setLocationChange(LocationTypes.global);
      setLocationPath([]);
      handleLocation(LocationTypes.global);
      setLocationSelectName('');
    }
  }, []);

  return (
    <>
      <div className="change-popup change-popup-inner choose-workspace">
        <div className="change-quick-book-header shadow-none mb-0 pb-0">
          <div className="quick-book-header p-0">
            <Link
              to="#"
              className="clear-book"
              onClick={() => {
                setLocationpage(false);
                setTotalHierarchy([]);
                setLocationSelectName(selectedAsset?.location_name);
                setGotoGlobal && setGotoGlobal(false);
              }}
            >
              <i className="fas fa-angle-left" />
            </Link>
            <h4>{QuickbookLabels.chooseLocation}</h4>
          </div>
          {splitTet1()}
        </div>
        <div>
          <div className="card-body scroll-body">
            <div className="day-info">
              <div className="booking-date-grid mb-3">
                <div className="quick-book-location">
                  <div className="book-location-info">
                    <div
                      className={`booking-location-date booking-location-change ${
                        locationChange == LocationTypes.global ? '' : 'border-0'
                      }`}
                    >
                      <Link
                        to="#"
                        onClick={() => {
                          setLocationChange(LocationTypes.global);
                          setLocationPath([]);
                          handleLocation(LocationTypes.global);
                          setLocationSelectName('');
                        }}
                      >
                        <img src={global} alt="img" />{' '}
                        <span>{LocationTypes.global}</span>
                      </Link>
                    </div>
                    <ul
                      className={
                        locationChange == LocationTypes.global
                          ? 'd-block globalscroll'
                          : 'd-none'
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
                                  setSlowSmallLocationLoader(true);
                                  postData(
                                    LocationListAPi,
                                    {
                                      filter_id: item?.id,
                                      type: 'location_selector',
                                    },
                                    (data, res) => {
                                      setSlowSmallLocationLoader(false);
                                      const getitem = { ...item };
                                      getitem['level'] = item?.location_type
                                        ? item.location_type
                                        : item.level;
                                      getitem['location_name'] = item?.name
                                        ? item.name
                                        : item.location_name;
                                      const childList: any = [];
                                      if (
                                        data !== undefined &&
                                        data?.List?.length > 0
                                      ) {
                                        for (const obj of data.List) {
                                          obj['level'] = obj.location_type;
                                          obj['location_name'] = obj.name;
                                          childList.push(obj);
                                        }
                                      }
                                      getitem['children'] = childList;
                                      const list: any = [];
                                      list.push(getitem);
                                      setLocationPath([...list]);
                                    },
                                  );
                                  setLocationChange(item.name);
                                  item?.location_type == LocationTypes.building
                                    ? (setDefaultBuliding(item?.name),
                                      setDefaultFloor(''),
                                      setUTCFormat(item?.utc_format))
                                    : '';
                                }}
                              >
                                <span>
                                  {item?.name}
                                  {' ('}
                                  {item?.location_type}
                                  {')'}
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
                locationPath.map((name, ind) => {
                  const level = name?.location_type
                    ? name?.location_type
                    : name?.level;
                  return (
                    <div className="quick-book-location" key={ind}>
                      <div className="book-location-grid">
                        <div className="book-location-info">
                          <div
                            className={`booking-location-date booking-location-change ${
                              name?.children?.length > 0 &&
                              locationChange == name?.location_name
                                ? ''
                                : 'border-0'
                            }`}
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                setLocationChange(name?.location_name);
                                const getitem = { ...name };
                                const list: any = [];
                                list.push(getitem);
                                const getLocationPathCopy = [...locationPath];
                                getLocationPathCopy.splice(ind + 1);
                                setLocationPath([...getLocationPathCopy]);
                              }}
                            >
                              <img src={findImg(name?.level)} alt="img" />{' '}
                              <span>
                                {name?.location_name}
                                {level ? ' (' + level + ')' : ''}
                              </span>
                            </Link>
                          </div>
                          <ul
                            className={
                              name?.children?.length > 0 &&
                              locationChange == name?.location_name
                                ? 'd-block'
                                : 'd-none'
                            }
                          >
                            {name?.level == LocationTypes.building ? (
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
                                          onClick={() => {
                                            setLocationpage(false);
                                            setFloorId(floor?.id);
                                            setInitial(true);
                                            editWorkspaces(floor?.id);
                                            setGotoGlobal &&
                                              setGotoGlobal(false);
                                            setDefaultFloor(
                                              floor?.location_name,
                                            );
                                            const labelName =
                                              name?.location_name +
                                              ', ' +
                                              floor?.location_name;
                                            const preparData = {
                                              label: labelName,
                                              value: floor?.id,
                                            };
                                            setLocationValue(preparData);
                                            setDefaultValue(preparData);
                                          }}
                                          className={
                                            floorId == floor?.id ||
                                            (floorId == null &&
                                              locationPaths?.includes(
                                                floor?.location_name,
                                              ))
                                              ? 'fw-bold'
                                              : ''
                                          }
                                        >
                                          <img
                                            src={
                                              floorId == floor?.id ||
                                              (floorId == null &&
                                                locationPaths?.includes(
                                                  floor?.location_name,
                                                ))
                                                ? Floorbox_2
                                                : Floorbox_1
                                            }
                                            alt="img"
                                          />{' '}
                                          {floor?.location_name}
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
                                          val?.location_name,
                                        )
                                          ? 'fw-bold'
                                          : ''
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
                                              type: 'location_selector',
                                            },
                                            (data, res) => {
                                              setSlowSmallLocationLoader(false);
                                              const getitem = { ...val };
                                              getitem['level'] =
                                                val?.location_type
                                                  ? val.location_type
                                                  : val.level;
                                              getitem['location_name'] =
                                                val?.name
                                                  ? val.name
                                                  : val.location_name;
                                              const childList: any = [];
                                              if (
                                                data !== undefined &&
                                                data?.List?.length > 0
                                              ) {
                                                for (const obj of data.List) {
                                                  obj['level'] =
                                                    obj.location_type;
                                                  obj['location_name'] =
                                                    obj.name;
                                                  childList.push(obj);
                                                }
                                              }
                                              getitem['children'] = childList;
                                              const list: any = [];
                                              list.push(getitem);
                                              const getLocationPathCopy = [
                                                ...locationPath,
                                              ];
                                              getLocationPathCopy.splice(
                                                ind + 1,
                                              );
                                              setLocationPath([
                                                ...getLocationPathCopy,
                                                ...list,
                                              ]);
                                            },
                                          );
                                          setLocationChange(val.name);
                                          val?.level == LocationTypes.building
                                            ? (setDefaultBuliding(
                                                val?.location_name,
                                              ),
                                              setDefaultFloor(''),
                                              setUTCFormat(val?.utc_format))
                                            : '';
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
                      changeHierarchy == null ? 'd-none' : 'd-block'
                    }`}
                    key={ind}
                  >
                    <div className="book-location-grid">
                      <div className="book-location-info">
                        <div
                          className={`booking-location-date booking-location-change ${
                            name?.children?.length > 0 &&
                            locationChange == name?.location_name
                              ? ''
                              : 'border-0'
                          }`}
                        >
                          <Link
                            to="#"
                            onClick={() =>
                              setLocationChange(name?.location_name)
                            }
                          >
                            <img src={findImg(name?.level)} alt="img" />{' '}
                            <span>{name?.location_name}</span>
                          </Link>
                        </div>
                        <ul
                          className={
                            name?.children?.length > 0 &&
                            locationChange == name?.location_name
                              ? 'd-block'
                              : 'd-none'
                          }
                        >
                          {name?.level == LocationTypes.building ? (
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
                                        onClick={() => {
                                          setFloorId(floor?.id);
                                          setInitial(true);
                                          editWorkspaces(floor?.id);
                                          setLocationpage(false);
                                          setGotoGlobal && setGotoGlobal(false);
                                        }}
                                        className={
                                          floorId == floor?.id ? 'fw-bold' : ''
                                        }
                                      >
                                        <img
                                          src={
                                            floorId == floor?.id
                                              ? Floorbox_2
                                              : Floorbox_1
                                          }
                                          alt="img"
                                        />{' '}
                                        {floor?.location_name}
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
                                        val?.location_name,
                                      )
                                        ? 'fw-bold'
                                        : ''
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        setChangeHierarchy(val?.id);
                                        setLocationChange(name?.location_name);
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
            </div>
            <div className="card-footer">
              <div className="booking-btns">
                <Link
                  to="#"
                  className="btn prev_btn"
                  onClick={() => {
                    setLocationpage(false);
                    setTotalHierarchy([]);
                    setLocationSelectName(selectedAsset?.location_name);
                  }}
                >
                  {findLabelText('Back', 'Back', 'Dashboard')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(LocationSelector);
