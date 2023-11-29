import React, { useContext, useEffect } from 'react';
import { employeeAddress } from '../../imagepath';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { PersonalContext } from '../personalController';
import { Controller } from 'react-hook-form';
import {
  countryCodeValues,
  homeAddressKeys,
  sectionNames,
} from '../../../assets/constants/config';
import InputComponentForNew from '../inputComponentForNew';
import { Col, Row } from 'antd';
import { findLabelText } from '../../commonMethod';

const Address = ({ setValue, control, trigger, errors, cancel }) => {
  const { Error, listData, countrycodeList, allFieldPermissionType } =
    useContext(PersonalContext);
  const filtered = countryCodeValues
    .filter(
      (obj, index) =>
        index === countryCodeValues.findIndex(item => item.value === obj.value),
    )
    .sort((a, b) => +a.value.replace('+', '') - +b.value.replace('+', ''));

  useEffect(() => {
    if (Object.keys(listData).length > 0) {
      const validateError = {
        shouldValidate: true,
      };
      setValue('address1', listData?.address1, validateError);
      setValue('address2', listData?.address2, validateError);
      setValue('city', listData?.city, validateError);
      setValue('state', listData?.state, validateError);
      setValue('zipcode', listData?.zipcode, validateError);
      setValue('country', listData?.country, validateError);
      setValue('homephone', listData?.home_phone, validateError);
      setValue('personalmobile', listData?.personal_mobile, validateError);
      setValue('personalemail', listData?.personal_email, validateError);
      filtered?.find(
        ele =>
          ele.value == listData?.home_ext &&
          setValue('homecode', ele, validateError),
      );
      filtered?.find(
        ele =>
          ele.value == listData?.personal_ext &&
          setValue('personalcode', ele, validateError),
      );
    }
  }, [listData, cancel]);

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.home_address && obj.field_name == key,
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

  return (
    <div className="personal-details personal-details-info">
      <div className="personal-header">
        <h4>
          <img src={employeeAddress} alt="" />
          {findLabelText('Home_address', 'Home address', 'Hr')}
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
                          {findLabelText('Address', 'Address', 'Hr')} 1
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(homeAddressKeys.address1) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="address1"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.address1)}
                                name="address1"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['address1']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['address1']?.message}</Error>
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
                          {findLabelText('Address', 'Address', 'Hr')} 2
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(homeAddressKeys.address2) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="address2"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.address2)}
                                name="address2"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['address2']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['address2']?.message}</Error>
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
                        {findIndex(homeAddressKeys.city) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="city"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.city)}
                                name="city"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['city']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['city']?.message}</Error>
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
                        <label>{findLabelText('State', 'State', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(homeAddressKeys.state) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="state"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.state)}
                                name="state"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['state']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['state']?.message}</Error>
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
                        <label>{`${findLabelText(
                          'Post',
                          'Post',
                          'Hr',
                        )} / ${findLabelText(
                          'Zip_Code',
                          'Zip code',
                          'Hr',
                        )}`}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(homeAddressKeys.zipcode) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="zipcode"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.zipcode)}
                                name="zipcode"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['zipcode']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['zipcode']?.message}</Error>
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
                        {findIndex(homeAddressKeys.country) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="country"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(homeAddressKeys.country)}
                                name="country"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['country']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['country']?.message}</Error>
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
                          {findLabelText('Home_Phone', 'Home number', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        <div className="personal-number-grid">
                          <div className="personal-number-select">
                            {findIndex(homeAddressKeys.home_phone) < '1' ? (
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
                                name="homecode"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <DropDownSelection
                                    isDisabled={
                                      findIndex(homeAddressKeys.home_phone) ==
                                      '1'
                                        ? true
                                        : false
                                    }
                                    options={filtered}
                                    minWidth="100px"
                                    height="35px"
                                    backgroundColor="#FFF"
                                    Value={value}
                                    onChange={value => {
                                      onChange(value);
                                      trigger('homecode');
                                    }}
                                    placeholder=""
                                    errClass={
                                      errors?.['homecode']?.['value']?.message
                                    }
                                  />
                                )}
                              />
                            )}
                            <Error>
                              {errors?.['homecode']?.['value']?.message}
                            </Error>
                          </div>
                          <div className="personal-number-input">
                            {findIndex(homeAddressKeys.home_phone) < '1' ? (
                              <>
                                <InputComponentForNew
                                  accessType="1"
                                  placeholder=""
                                  Optional=""
                                />
                              </>
                            ) : (
                              <Controller
                                name="homephone"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <InputComponentForNew
                                    accessType={findIndex(
                                      homeAddressKeys.home_phone,
                                    )}
                                    Label=""
                                    name="homephone"
                                    placeholder=""
                                    Optional=""
                                    onChange={onChange}
                                    trigger={trigger}
                                    value={value}
                                    maxLength={15}
                                    errClass={errors?.['homephone']?.message}
                                  />
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <Error>{errors?.['homephone']?.message}</Error>
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
                            'Personal_Mobile',
                            'Personal mobile',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        <div className="personal-number-grid">
                          <div className="personal-number-select">
                            {findIndex(homeAddressKeys.personal_mobile) <
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
                                name="personalcode"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <DropDownSelection
                                    isDisabled={
                                      findIndex(
                                        homeAddressKeys.personal_mobile,
                                      ) == '1'
                                        ? true
                                        : false
                                    }
                                    options={filtered}
                                    minWidth="100px"
                                    height="35px"
                                    Value={value}
                                    backgroundColor="#FFF"
                                    onChange={value => {
                                      onChange(value);
                                      trigger('personalcode');
                                    }}
                                    placeholder=""
                                    errClass={
                                      errors?.['personalcode']?.['value']
                                        ?.message
                                    }
                                  />
                                )}
                              />
                            )}
                            <Error>
                              {errors?.['personalcode']?.['value']?.message}
                            </Error>
                          </div>
                          <div className="personal-number-input">
                            {findIndex(homeAddressKeys.personal_mobile) <
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
                                name="personalmobile"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <InputComponentForNew
                                    accessType={findIndex(
                                      homeAddressKeys.personal_mobile,
                                    )}
                                    Label=""
                                    name="personalmobile"
                                    placeholder=""
                                    Optional=""
                                    onChange={onChange}
                                    trigger={trigger}
                                    value={value}
                                    maxLength={15}
                                    errClass={
                                      errors?.['personalmobile']?.message
                                    }
                                  />
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <Error>{errors?.['personalmobile']?.message}</Error>
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
                            'Personal_Email',
                            'Personal email',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(homeAddressKeys.personal_email) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="personalemail"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  homeAddressKeys.personal_email,
                                )}
                                name="personalemail"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['personalemail']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['personalemail']?.message}</Error>
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

export default Address;
