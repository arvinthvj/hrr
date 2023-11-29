import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { hrLocationIcon } from '../../imagepath';
import { Controller } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import DropDownSelection from '../../selectfield/dropDownSelection';
import {
  countryCodeValues,
  jobSecction,
  workinformation,
  worklocation,
} from '../../../assets/constants/config';
import { hrLocationListApi } from '../../../services/apiurl';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../services/apicall';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import LocationSelectorComponent from '../../locationSelectorComponent';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import { bookLocation } from '../../imagepath';
import { Col, Row } from 'antd';
import InputComponentForNew from '../inputComponentForNew';
import { findLabelText } from '../../commonMethod';

const Location = ({
  control,
  trigger,
  errors,
  informationList,
  setValue,
  reset,
  cancel,
  setRemoveDisabled,
}) => {
  const { Error, allFieldPermissionType, locationState } =
    useContext(PersonalContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [locationValue, setLocationValue] = useState<any>({});
  const [locationOption, setLocationOption] = useState<any>([]);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const { userDetails } = useSelector((state: RootReduxProps) => state.app);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<any>(null);
  const [defaultBuliding, setDefaultBuliding] = useState<any | undefined>('');
  const [defaultFloor, setDefaultFloor] = useState<any | undefined>('');
  const [floorId, setFloorId] = useState<number | string | undefined>('');
  const [allLocation, setAllLocation] = useState<any>([]);
  const [Location, setLocation] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<any>();

  useEffect(() => {
    loading;
    locationValue;
  }, []);

  useEffect(() => {
    setLocation(false);
    getInputFiledValue();
  }, [informationList, cancel]);

  const handleLocationChange = data => {
    setRemoveDisabled(true);
    setFloorId(data);
  };

  useEffect(() => {
    const list = informationList?.find(item => item?.list_type == 'work_basic');
    const userLocation = locationOption?.find(
      val => val?.value == list?.work_location,
    );
    setLocationData(userLocation);
  }, [locationOption]);

  useEffect(() => {
    setValue('Location', floorId);
  }, [floorId]);

  const filtered = countryCodeValues
    .filter(
      (obj, index) =>
        index === countryCodeValues.findIndex(item => item.value === obj.value),
    )
    .sort((a, b) => +a.value.replace('+', '') - +b.value.replace('+', ''));

  const getInputFiledValue = () => {
    const list = informationList?.find(item => item?.list_type == 'work_basic');
    const validateError = {
      shouldValidate: true,
    };
    filtered?.find(
      ele =>
        ele.value == list?.country_code &&
        setValue('countrycode1', ele, validateError),
    );
    setValue('companyPhone', list?.company_phone, validateError);
    setValue('Extension', list?.company_phone_ext, validateError);
    filtered?.find(
      ele =>
        ele.value == list?.company_mobile_ext &&
        setValue('countrycode2', ele, validateError),
    );
    setValue('phoneNumber', list?.company_mobile, validateError);
    setValue('Email', list?.work_email, validateError);
    setValue('Street', list?.work_street, validateError);
    setValue('Suburb', list?.work_suburb, validateError);
    setValue('City', list?.work_city, validateError);
    setValue('State', list?.work_state, validateError);
    setValue('Region', list?.work_region, validateError);
    setValue('Country', list?.work_country, validateError);
  };

  useEffect(() => {
    let locSort = [];
    setLoading(true);
    dispatch(showLoader());
    postData(hrLocationListApi, '', loclist => {
      dispatch(hideLoader());
      const Z = loclist?.List?.sort((a, b) => a.id - b.id);
      locSort = Z?.map(i => ({
        label: i?.name,
        value: i?.id,
        hierarchy: i?.fullname,
        timezone: i?.timezone,
      }));
      setLocationOption(locSort);
      if (locationState?.profile) {
        const searchLocId = locationState?.profile?.location_id?.[0]?.id;
        const teamLocation =
          searchLocId && locSort?.find((i: any) => i?.value == searchLocId);
        setLocationValue(teamLocation);
      }
    });
  }, []);

  useEffect(() => {
    if (!defaultBuliding) setAllLocation([]);
    if (allLocation?.length === 0 && Location) {
      reset(values => ({
        ...values,
        Street: '',
        Suburb: '',
        City: '',
        State: '',
        Region: '',
        Country: '',
      }));
    }
    if (allLocation?.length > 0 && defaultBuliding) {
      const RegionName = allLocation?.find(
        item => item?.location_type == 'Region',
      );
      const countryName = allLocation?.find(
        item => item?.location_type == 'Country',
      );
      const stateName = allLocation?.find(
        item => item?.location_type == 'State',
      );
      const suburbName = allLocation?.find(
        item => item?.location_type == 'Suburb',
      );
      const cityName = allLocation?.find(item => item?.location_type == 'City');
      const streetName = allLocation?.find(
        item => item?.location_type == 'Street',
      );
      const RegionName1 = allLocation?.find(item => item?.level == 'Region');
      const countryName1 = allLocation?.find(item => item?.level == 'Country');
      const stateName1 = allLocation?.find(item => item?.level == 'State');
      const suburbName1 = allLocation?.find(item => item?.level == 'Suburb');
      const cityName1 = allLocation?.find(item => item?.level == 'City');
      const streetName1 = allLocation?.find(item => item?.level == 'Street');
      reset(values => ({
        ...values,
        Street: streetName?.location_name
          ? streetName?.location_name
          : streetName1?.location_name
          ? streetName1?.location_name
          : '',
        Suburb: suburbName?.location_name
          ? suburbName?.location_name
          : suburbName1?.location_name
          ? suburbName1?.location_name
          : '',
        City: cityName?.location_name
          ? cityName?.location_name
          : cityName1?.location_name
          ? cityName1?.location_name
          : '',
        State: stateName?.location_name
          ? stateName?.location_name
          : stateName1?.location_name
          ? stateName1?.location_name
          : '',
        Region: RegionName?.location_name
          ? RegionName?.location_name
          : RegionName1?.location_name
          ? RegionName1?.location_name
          : '',
        Country: countryName?.location_name
          ? countryName?.location_name
          : countryName1?.location_name
          ? countryName1?.location_name
          : '',
      }));
    }
  }, [allLocation, defaultBuliding]);

  useEffect(() => {
    const textsplit = locationState?.profile?.location_id?.[0]?.name
      ? locationState?.profile?.location_id?.[0]?.name?.toString()?.split(',')
      : locationData
      ? locationData?.label?.toString()?.split(',')
      : userDetails?.location?.[0]?.name?.toString()?.split(',');
    setFloorId(
      locationState?.profile?.location_id?.[0]?.id
        ? locationState?.profile?.location_id?.[0]?.id
        : locationData
        ? locationData?.value
        : userDetails?.location_id,
    );
    setDefaultBuliding(textsplit?.[0]);
    setDefaultFloor(textsplit?.[1]);
  }, [userDetails, locationState, locationData]);

  const splitTet1 = () => {
    return (
      <div className="location-booking location-booking-info-hr me-0">
        <div className="booking-desk-details location-hierarchy">
          <h6>{defaultBuliding}</h6>
          <p className="ms-2">{defaultFloor}</p>
        </div>
        <span>
          <Link to="#">
            <img src={bookLocation} alt="img" />
          </Link>
        </span>
      </div>
    );
  };

  const findPermission = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == jobSecction.worklocation && obj.field_name == type,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };
  const findPermissions = (type: string) => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == jobSecction.workinformation &&
        obj.field_name == type,
    );
    let maxPermission = -Infinity;
    for (const item of findObj) {
      const permission = parseInt(item.permission, 10);
      if (!isNaN(permission) && permission > maxPermission) {
        maxPermission = permission;
      }
    }
    return String(maxPermission);
  };

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (
        dropdownRef?.current?.classList?.contains('d-block') &&
        !dropdownRef?.current?.contains(e.target) &&
        !selectRef.current.contains(e.target)
      ) {
        setLocationDropdown(false);
      }
    });
    return () => {
      window.removeEventListener('click', (e: any) => {
        if (
          dropdownRef?.current?.classList?.contains('d-block') &&
          !dropdownRef?.current?.contains(e.target) &&
          !selectRef.current.contains(e.target)
        ) {
          setLocationDropdown(false);
        }
      });
    };
  }, []);

  return (
    <div className="personal-details personal-details-info">
      <div className="personal-header">
        <h4>
          <img src={hrLocationIcon} alt="" />
          Work location
        </h4>
      </div>
      <Row>
        <Col xl={12} lg={12} md={24} span={24}>
          <div className="personal-group-left">
            <div className="personal-group-info">
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText('Location', 'Location', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-text personal-group-location">
                        <>
                          <div
                            className="change-quick-book-header location-change-header shadow-none mb-0 pb-0"
                            onClick={() => {
                              findPermission(worklocation.street) !== '1'
                                ? setLocationDropdown(true)
                                : setLocationDropdown(false);
                            }}
                            ref={selectRef}
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
                              locationId={Number(
                                locationState?.profile?.location_id?.[0]?.id
                                  ? locationState?.profile?.location_id?.[0]?.id
                                  : locationData
                                  ? locationData?.value
                                  : userDetails?.location_id,
                              )}
                              locationNames={
                                locationState?.profile?.location_id?.[0]?.name
                                  ? locationState?.profile?.location_id?.[0]
                                      ?.name
                                  : locationData
                                  ? locationData?.label
                                  : userDetails?.location?.[0]?.name
                              }
                              setDefaultFloor={setDefaultFloor}
                              setDefaultBuliding={setDefaultBuliding}
                              handleLocationChange={handleLocationChange}
                              floorId={
                                locationState?.profile?.location_id?.[0]?.id
                              }
                              setLocationDropdown={setLocationDropdown}
                              setAllLocation={setAllLocation}
                              setLocation={setLocation}
                              setTimeZone={() => {
                                return;
                              }}
                              isHrModule={'1'}
                            />
                          </div>
                        </>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('Street', 'Street', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.street) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Street"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(worklocation.street)}
                                name="Street"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['Street']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Street']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('Suburb', 'Suburb', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.suburb) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Suburb"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(worklocation.suburb)}
                                name="Suburb"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['Suburb']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Suburb']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('City', 'City', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.City) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="City"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(worklocation.City)}
                                name="City"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['City']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['City']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('City', 'City', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.State) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="State"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(worklocation.State)}
                                name="State"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['State']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['State']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('Region', 'Region', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.Region) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Region"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(worklocation.Region)}
                                name="Region"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['Region']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Region']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText('Country', 'Country', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(worklocation.Country) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Country"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(
                                  worklocation.Country,
                                )}
                                name="Country"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['Country']?.message}
                                disabled={true}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Country']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xl={12} lg={12} md={24} span={24}>
          <div className="personal-group-right">
            <div className="personal-group-info">
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText(
                            'Company_Phone',
                            'Company Phone',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        <div className="personal-number-grid">
                          <div className="personal-number-select">
                            {findPermissions(workinformation.company_phone) <
                            '1' ? (
                              <>
                                <DropDownSelection
                                  isDisabled={true}
                                  options={filtered}
                                  minWidth="150px"
                                  height="35px"
                                  backgroundColor="#FAFAFA"
                                  onChange={() => {
                                    return;
                                  }}
                                  placeholder=""
                                  disabledIcon={true}
                                />
                              </>
                            ) : (
                              <Controller
                                name="countrycode1"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <DropDownSelection
                                    isDisabled={
                                      findPermissions(
                                        workinformation.company_phone,
                                      ) === '1'
                                    }
                                    options={filtered}
                                    minWidth="100px"
                                    height="35px"
                                    Value={value}
                                    backgroundColor="#FFF"
                                    onChange={value => {
                                      onChange(value);
                                      trigger('countrycode1');
                                    }}
                                    placeholder=""
                                    errClass={errors?.['countrycode1']?.message}
                                  />
                                )}
                              />
                            )}
                            <Error>{errors?.['countrycode1']?.message}</Error>
                          </div>
                          <div className="personal-number-input">
                            {findPermissions(workinformation.company_phone) <
                            '1' ? (
                              <>
                                <InputComponentForNew
                                  accessType="1"
                                  placeholder=""
                                  Optional=""
                                />
                              </>
                            ) : (
                              <Controller
                                name="companyPhone"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <InputComponentForNew
                                    accessType={findPermissions(
                                      workinformation.company_phone,
                                    )}
                                    Label=""
                                    name="companyPhone"
                                    placeholder=""
                                    Optional=""
                                    onChange={onChange}
                                    trigger={trigger}
                                    value={value}
                                    maxLength={15}
                                    errClass={errors?.['companyPhone']?.message}
                                  />
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <Error>{errors?.['companyPhone']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText('Extension', 'Extension', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermissions(
                          workinformation.company_phone_extension,
                        ) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Extension"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermissions(
                                  workinformation.company_phone_extension,
                                )}
                                name="Extension"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={6}
                                errClass={errors?.['Extension']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Extension']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText(
                            'Company_mobile',
                            'Company mobile',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        <div className="personal-number-grid">
                          <div className="personal-number-select">
                            {findPermissions(workinformation.company_mobile) <
                            '1' ? (
                              <>
                                <DropDownSelection
                                  isDisabled={true}
                                  options={filtered}
                                  minWidth="150px"
                                  height="35px"
                                  backgroundColor="#FAFAFA"
                                  onChange={() => {
                                    return;
                                  }}
                                  placeholder=""
                                  disabledIcon={true}
                                />
                              </>
                            ) : (
                              <Controller
                                name="countrycode2"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <DropDownSelection
                                    isDisabled={
                                      findPermissions(
                                        workinformation.company_mobile,
                                      ) === '1'
                                    }
                                    options={filtered}
                                    minWidth="100px"
                                    height="35px"
                                    Value={value}
                                    backgroundColor="#FFF"
                                    onChange={value => {
                                      onChange(value);
                                      trigger('countrycode2');
                                    }}
                                    placeholder=""
                                    errClass={errors?.['countrycode2']?.message}
                                  />
                                )}
                              />
                            )}
                            <Error>{errors?.['countrycode2']?.message}</Error>
                          </div>
                          <div className="personal-number-input">
                            {findPermissions(workinformation.company_mobile) <
                            '1' ? (
                              <>
                                <InputComponentForNew
                                  accessType="1"
                                  placeholder=""
                                  Optional=""
                                />
                              </>
                            ) : (
                              <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <InputComponentForNew
                                    accessType={findPermissions(
                                      workinformation.company_mobile,
                                    )}
                                    Label=""
                                    name="phoneNumber"
                                    placeholder=""
                                    Optional=""
                                    onChange={onChange}
                                    trigger={trigger}
                                    value={value}
                                    maxLength={15}
                                    errClass={errors?.['phoneNumber']?.message}
                                  />
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <Error>{errors?.['phoneNumber']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText('Work_email', 'Work email', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermissions(workinformation.work_email) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Email"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermissions(
                                  workinformation.work_email,
                                )}
                                name="Email"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['Email']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Email']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Location;
