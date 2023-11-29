import React, { useContext, useEffect, useState } from 'react';
import { employeeIcon } from '../../imagepath';
import DatePickerComponent from '../../datepicker/index';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { PersonalContext } from '../personalController';
import moment from 'moment';
import { Controller } from 'react-hook-form';
import { gender, marital, pronoun, title } from '../constants';
import {
  basicIndormationKeys,
  dateFormat_YYYY_MM_DD,
  global,
  sectionNames,
} from '../../../assets/constants/config';
import InputComponentForNew from '../inputComponentForNew';
import { Col, Row } from 'antd';
import { findLabelText } from '../../commonMethod';

const PersonalDetails = ({
  setValue,
  control,
  trigger,
  errors,
  watch,
  cancel,
}) => {
  const { Error, listData, allFieldPermissionType, countryList } =
    useContext(PersonalContext);
  const [age, setAge] = useState('');
  const [showTypeCharactersExceeded, updateTypeFlag] = useState(false);
  const [notesLimitExceeded, updatenotesFlag] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const disabledFutureDate = current => {
    return current && current > moment().endOf('day');
  };
  useEffect(() => {
    updateTypeFlag(false);
    age;
  }, []);
  const prepareInitialData = () => {
    const validateError = {
      shouldValidate: true,
    };
    setValue('employeeid', listData?.employee_id, validateError);
    title?.find(
      ele =>
        ele.value == listData?.title && setValue('title', ele, validateError),
    );
    setValue('firstname', listData?.first_name, validateError);
    setValue('middlename', listData?.middle_name, validateError);
    setValue('lastname', listData?.last_name, validateError);
    setValue('displayname', listData?.display_name, validateError);
    setValue(
      'birthdate',
      listData?.birth_date && moment(listData?.birth_date),
      validateError,
    );
    setBirthDate(listData?.birth_date);
    marital?.find(
      ele =>
        ele.value == listData?.marital_status &&
        setValue('maritalstatus', ele, validateError),
    );
    gender?.find(
      ele =>
        ele.value == listData?.gender && setValue('gender', ele, validateError),
    );
    pronoun?.find(
      ele =>
        ele.value == listData?.pronoun &&
        setValue('pronoun', ele, validateError),
    );
    countryList?.find(
      ele =>
        ele.value == listData?.nationality &&
        setValue('nationality', ele, validateError),
    );
    setValue('about', listData?.about, validateError);
  };

  useEffect(() => {
    prepareInitialData();
  }, [listData, cancel]);

  useEffect(() => {
    setAge(
      String(
        moment().diff(moment(birthDate).format(dateFormat_YYYY_MM_DD), 'years'),
      ),
    );
  }, [birthDate]);
  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj =>
        obj.section_name == sectionNames.basic_information &&
        obj.field_name == key,
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
    <div className="personal-details">
      <div className="personal-header">
        <h4>
          <img src={employeeIcon} alt="" />
          {findLabelText('Basic_information', 'Basic information', 'Hr')}
        </h4>
      </div>

      <Row className="align-items-end">
        <Col xl={12} lg={12} md={24} span={24}>
          <div className="personal-group-left">
            <div className="personal-group-info">
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>
                          {findLabelText('employee_id', 'Employee ID', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.employeeId) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="employeeid"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  basicIndormationKeys.employeeId,
                                )}
                                name="employeeid"
                                placeholder=""
                                disabled={false}
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['employeeid']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['employeeid']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="personal-group-info">
              <div className="personal-group">
                <div className="personal-input-info">
                  <Row className="align-items-center">
                    <Col xl={8} lg={8} md={8} span={24}>
                      <div className="persnoal-label">
                        <label>{findLabelText('title', 'Title', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.first_name) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={marital}
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
                            name="title"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findIndex(basicIndormationKeys.first_name) ==
                                  '1'
                                    ? true
                                    : false
                                }
                                options={title}
                                minWidth="100px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('title');
                                }}
                                placeholder=""
                                errClass={errors?.['title']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['title']?.message}</Error>
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
                          {findLabelText('first_name', 'First name', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.first_name) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="firstname"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  basicIndormationKeys.first_name,
                                )}
                                name="firstname"
                                placeholder=""
                                onChange={val => {
                                  onChange(val);
                                  const firstName = watch('firstname');
                                  const lastName = watch('lastname');

                                  const fullName = `${
                                    firstName ? firstName : ''
                                  }  ${lastName ? lastName : ''}`;
                                  setValue('displayname', fullName);
                                }}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['firstname']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['firstname']?.message}</Error>
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
                          {findLabelText('Middle_name', 'Middle name', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.middle_name) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="middlename"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  basicIndormationKeys.middle_name,
                                )}
                                name="middlename"
                                placeholder=""
                                Optional="Optional"
                                onChange={val => {
                                  onChange(val);
                                  const firstName = watch('firstname');
                                  const lastName = watch('lastname');

                                  const fullName = `${
                                    firstName ? firstName : ''
                                  } ${lastName ? lastName : ''}`;
                                  setValue('displayname', fullName);
                                }}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['middlename']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['middlename']?.message}</Error>
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
                          {findLabelText('Last_name', 'Last name', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.last_name) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="lastname"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  basicIndormationKeys.last_name,
                                )}
                                name="lastname"
                                placeholder=""
                                onChange={val => {
                                  onChange(val);
                                  const firstName = watch('firstname');
                                  const lastName = watch('lastname');

                                  const fullName = `${
                                    firstName ? firstName : ''
                                  } ${lastName ? lastName : ''}`;
                                  setValue('displayname', fullName);
                                }}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['lastname']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['lastname']?.message}</Error>
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
                          {findLabelText('Display_name', 'Display name', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.display_name) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="displayname"
                            control={control}
                            rules={{ maxLength: 50 }}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findIndex(
                                  basicIndormationKeys.display_name,
                                )}
                                name="displayname"
                                placeholder=""
                                onChange={e => {
                                  onChange(e?.target?.value);
                                }}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={
                                  showTypeCharactersExceeded
                                    ? global.validationLabel.hrModuleValidation
                                        .vaccinationCharactersExceeded
                                    : errors?.['displayname']?.message
                                }
                              />
                            )}
                          />
                        )}
                        {showTypeCharactersExceeded ? (
                          <Error>
                            {
                              global.validationLabel.hrModuleValidation
                                .vaccinationCharactersExceeded
                            }
                          </Error>
                        ) : (
                          <Error>{errors?.['displayname']?.message}</Error>
                        )}
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
                          {findLabelText('Birth_date', 'Birth date', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.birth_date) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="birthdate"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePickerComponent
                                disableStyle={
                                  findIndex(basicIndormationKeys.birth_date) ==
                                  '1'
                                    ? 'form-control-disabled'
                                    : ''
                                }
                                isDisable={
                                  findIndex(basicIndormationKeys.birth_date) ==
                                  '1'
                                    ? true
                                    : false
                                }
                                suffixIcon=""
                                disabledFutureDate={disabledFutureDate}
                                name="birthdate"
                                handleChange={value => {
                                  setBirthDate(value);
                                }}
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                placeholder="Select Date"
                                errClass={errors?.['birthdate']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['birthdate']?.message}</Error>
                        {/* <div className="birth-date">
                              <span>{age != "NaN" ? age : ""}</span>
                            </div> */}
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
                            'Marital_status',
                            'Marital status',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.marital_status) <
                        '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={marital}
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
                            name="maritalstatus"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findIndex(
                                    basicIndormationKeys.marital_status,
                                  ) == '1'
                                    ? true
                                    : false
                                }
                                options={marital}
                                Value={value}
                                minWidth="150px"
                                height="35px"
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('maritalstatus');
                                }}
                                placeholder=""
                                errClass={errors?.['maritalstatus']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['maritalstatus']?.message}</Error>
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
                        <label>{findLabelText('Gender', 'Gender', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.gender) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={marital}
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
                            name="gender"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findIndex(basicIndormationKeys.gender) == '1'
                                    ? true
                                    : false
                                }
                                options={gender}
                                minWidth="100px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('gender');
                                }}
                                placeholder=""
                                errClass={errors?.['gender']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['gender']?.message}</Error>
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
                          {findLabelText('Pronoun', 'Pronoun', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.pronoun) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={marital}
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
                            name="pronoun"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findIndex(basicIndormationKeys.pronoun) == '1'
                                    ? true
                                    : false
                                }
                                options={pronoun}
                                minWidth="100px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('pronoun');
                                }}
                                placeholder=""
                                errClass={errors?.['pronoun']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['pronoun']?.message}</Error>
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
                          {findLabelText('Nationality', 'Nationality', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findIndex(basicIndormationKeys.nationality) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={marital}
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
                            name="nationality"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findIndex(basicIndormationKeys.nationality) ==
                                  '1'
                                    ? true
                                    : false
                                }
                                options={countryList}
                                minWidth="100px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('nationality');
                                }}
                                placeholder=""
                                errClass={errors?.['nationality']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['nationality']?.message}</Error>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xl={24} lg={24} md={24} span={24}>
          <div className="personal-group-info">
            <div className="personal-group mb-0">
              <label>{findLabelText('About', 'About', 'Hr')}</label>
              {findIndex(basicIndormationKeys.about) < '1' ? (
                <>
                  <textarea
                    disabled={true}
                    className="form-control form-control-disabled"
                    style={{
                      background: '#FAFAFA',
                      color: '#777777',
                    }}
                    placeholder={'Optional \n\n\n Max 300 characters'}
                  />
                </>
              ) : (
                <Controller
                  name="about"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <textarea
                      disabled={
                        findIndex(basicIndormationKeys.about) == '1'
                          ? true
                          : false
                      }
                      className={
                        findIndex(basicIndormationKeys.about) == '1'
                          ? 'form-control form-control-disabled'
                          : notesLimitExceeded || errors?.['about']?.message
                          ? 'form-control is-invalid-field'
                          : 'form-control'
                      }
                      value={value ? value : ''}
                      placeholder={'Optional \n\n\n Max 300 characters'}
                      onChange={e => {
                        if (e?.target?.value?.length > 300) {
                          updatenotesFlag(true);
                          setTimeout(() => {
                            updatenotesFlag(false);
                          }, 2000);
                        } else {
                          onChange(e?.target?.value);
                          trigger('about');
                        }
                      }}
                    />
                  )}
                />
              )}
              {notesLimitExceeded ? (
                <Error>
                  {
                    global.validationLabel.hrModuleValidation
                      .CharactersExceeded300
                  }
                </Error>
              ) : (
                <Error>{errors?.['about']?.message}</Error>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDetails;
