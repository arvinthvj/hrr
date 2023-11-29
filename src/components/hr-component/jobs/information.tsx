import React, { useContext, useEffect, useState } from 'react';
import { permission_10 } from '../../imagepath';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { Controller } from 'react-hook-form';
import DatePickerComponent from '../../datepicker/index';
import { PersonalContext } from '../personalController';
import moment from 'moment';
import { jobSecction, workinformation } from '../../../assets/constants/config';
import { timeOffProfiles } from '../../../services/apiurl';
import { postData } from '../../../services/apicall';
import { Col, Row, Tooltip } from 'antd';
import InputComponentForNew from '../inputComponentForNew';
import { findLabelText } from '../../commonMethod';

const Information = ({
  control,
  trigger,
  errors,
  informationList,
  setValue,
  cancel,
}) => {
  const {
    listData,
    countryList,
    Error,
    workStatusOption,
    allFieldPermissionType,
  } = useContext(PersonalContext);
  const [profileData, setProfileData] = useState([]);
  const findPermission = (type: string) => {
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

  const disabledDate = current => {
    return current && current < moment().endOf('day');
  };
  const calculateDateDifference = () => {
    if (birthDate) {
      const currentDate = moment();
      const futureDate = moment(birthDate);
      const diffInDays = futureDate.diff(currentDate, "days");
      return diffInDays;
    }
    return null;
  };
  const listProfileData = () => {
    postData(timeOffProfiles.List, '', data => {
      if (data != 'error') {
        const options = data
          .filter(item => item.status === 1)
          .map(item => ({
            id: item.id,
            label: item.name,
            value: item.name,
          }));
        setProfileData(options);
      }
    });
  };

  useEffect(() => {
    listProfileData();
  }, []);
  useEffect(() => {
    const list = informationList?.find(item => item?.list_type == 'work_basic');
    const validateError = {
      shouldValidate: true,
    };
    setValue('employee_id', listData?.employee_id, validateError);
    setValue('Grade', list?.grade, validateError);
    workStatusOption?.find(
      ele =>
        ele.value == list?.work_status &&
        setValue('Status', ele, validateError),
    );
    list?.probation_end
      ? setValue('Probation', moment(list?.probation_end), validateError)
      : setValue('Probation', '');
    setValue('notice', list?.notice_period, validateError);
    profileData?.find(
      ele =>
        ele.value == list?.timeoff_profile &&
        setValue('profile', ele, validateError),
    );
    countryList?.find(
      ele =>
        ele.value == list?.work_calender &&
        setValue('calendar', ele, validateError),
    );
    setValue('id', list?.id, validateError);
    setValue('Cost', list?.cost_center, validateError);
  }, [informationList, profileData, cancel, listData]);

  return (
    <div className="personal-details">
      <div className="personal-header">
        <h4>
          <img src={permission_10} alt="" />
          Work information
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
                          {findLabelText('employee_id', 'Employee ID', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.employee_id) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="employee_id"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(
                                  workinformation.employee_id,
                                )}
                                name="employee_id"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['id']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['id']?.message}</Error>
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
                        <label>{findLabelText('Grade', 'Grade', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.grade) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Grade"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(
                                  workinformation.grade,
                                )}
                                name="Grade"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                maxLength={50}
                                errClass={errors?.['Grade']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Grade']?.message}</Error>
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
                        <label>{findLabelText('Status', 'Status', 'Hr')}</label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.status) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={countryList}
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
                            name="Status"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findPermission(workinformation.status) === '1'
                                }
                                options={workStatusOption}
                                minWidth="105px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('Status');
                                }}
                                placeholder=""
                                errClass={errors?.['Status']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Status']?.message}</Error>
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
                            'Probation_end',
                            'Probation end',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.probation_end) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Probation"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DatePickerComponent
                                disableStyle={
                                  findPermission(
                                    workinformation.probation_end,
                                  ) === '1'
                                    ? 'form-control-disabled'
                                    : ''
                                }
                                isDisable={
                                  findPermission(
                                    workinformation.probation_end,
                                  ) == '1'
                                }
                                suffixIcon=""
                                disabledFutureDate={disabledDate}
                                name="Probation"
                                handleChange={value => {
                                  console.log('value--', value);
                                }}
                                onChange={onChange}
                                trigger={trigger}
                                value={value ? value : ''}
                                errClass={errors?.['Probation']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Probation']?.message}</Error>
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
                            'Notice_period',
                            'Notice period',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <Tooltip title="Provide information in format: number/period. Example: 1 month, 2 weeks etc.">
                        <div className="personal-group personal-group-form-control">
                          {findPermission(workinformation.notice_period) <
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
                              name="notice"
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <InputComponentForNew
                                  accessType={findPermission(
                                    workinformation.notice_period,
                                  )}
                                  name="notice"
                                  placeholder=""
                                  Optional=""
                                  onChange={val => {
                                    onChange(val);
                                  }}
                                  trigger={trigger}
                                  value={value}
                                  errClass={errors?.['notice']?.message}
                                />
                              )}
                            />
                          )}
                          <Error>{errors?.['notice']?.message}</Error>
                        </div>
                      </Tooltip>
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
                            'Leave_profile',
                            'Leave profile',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.Timeoff_profile) <
                        '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={countryList}
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
                            name="profile"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findPermission(
                                    workinformation.Timeoff_profile,
                                  ) === '1'
                                }
                                options={profileData}
                                minWidth="110px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('profile');
                                }}
                                placeholder=""
                                errClass={errors?.['profile']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['profile']?.message}</Error>
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
                            'Work_calendar',
                            'Work calendar',
                            'Hr',
                          )}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.work_calendar) < '1' ? (
                          <>
                            <DropDownSelection
                              isDisabled={true}
                              options={countryList}
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
                            name="calendar"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <DropDownSelection
                                isDisabled={
                                  findPermission(
                                    workinformation.work_calendar,
                                  ) === '1'
                                }
                                options={countryList}
                                minWidth="110px"
                                height="35px"
                                Value={value}
                                backgroundColor="#FFF"
                                onChange={value => {
                                  onChange(value);
                                  trigger('calendar');
                                }}
                                placeholder=""
                                errClass={errors?.['calendar']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['calendar']?.message}</Error>
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
                          {findLabelText('Cost_centre', 'Cost centre', 'Hr')}
                        </label>
                      </div>
                    </Col>
                    <Col xl={16} lg={16} md={16} span={24}>
                      <div className="personal-group personal-group-form-control">
                        {findPermission(workinformation.cost_center) < '1' ? (
                          <>
                            <InputComponentForNew
                              accessType="1"
                              placeholder=""
                              Optional=""
                            />
                          </>
                        ) : (
                          <Controller
                            name="Cost"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <InputComponentForNew
                                accessType={findPermission(
                                  workinformation.cost_center,
                                )}
                                name="Cost"
                                placeholder=""
                                Optional=""
                                onChange={onChange}
                                trigger={trigger}
                                value={value}
                                errClass={errors?.['Cost']?.message}
                              />
                            )}
                          />
                        )}
                        <Error>{errors?.['Cost']?.message}</Error>
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

export default Information;
