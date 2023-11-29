import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputComponent from '../../hr-component/inputComponent';
import { Controller } from 'react-hook-form';
import { timeOffProfiles } from '../../../services/apiurl';
import DeleteModel from '../deleteModel';
import { Link } from 'react-router-dom';
import { dropdown_angel } from '../../imagepath';
import { global } from '../../../assets/constants/config';
import { Col, Row } from 'antd';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { findLabelText } from '../../commonMethod';

const CreateTimeOffSettings = ({
  control,
  trigger,
  errors,
  setValue,
  editData,
  setIsopened,
  listData,
  data,
  cancel,
}) => {
  const Error = styled.p({
    color: 'red',
  });
  const [checkedValue, setCheckedValue] = useState([]);
  const [error, setError] = useState({ Description: false, name: false });
  const [editCheckedValue, setEditCheckedValue] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [collapseClass, setCollapseClass] = useState<any>({
    personalDetail: true,
    defaults: true,
  });

  useEffect(() => {
    if (Object.keys(editData)?.length > 0) {
      setEditCheckedValue(editData?.timeoff_types?.split(','));
      editData?.status == 1
        ? setValue('active', true)
        : setValue('active', false);
      setValue('Name', editData?.name);
      setValue('Description', editData?.description);
      setCheckedValue(editData?.timeoff_types.split(',').map(Number));
    } else {
      resetData();
    }
  }, [editData]);

  useEffect(() => {
    if (Object.keys(editData)?.length > 0) {
      setValue(
        'vacation',
        dropdownOptions?.find(item => item?.id == editData?.vacation_default),
      );
      setValue(
        'sick',
        dropdownOptions?.find(item => item.id == editData?.sick_default),
      );
      setValue(
        'outofoffice',
        dropdownOptions?.find(item => item.id == editData?.outofoffice_default),
      );
    }
  }, [dropdownOptions]);

  useEffect(() => {
    cancel != '' && resetData();
  }, [cancel]);

  useEffect(() => {
    data?.map(item => {
      setValue(
        `custom_check${item?.id}`,
        editCheckedValue?.some(check => item?.id == check),
      );
    });
  }, [editCheckedValue]);

  const resetData = () => {
    setValue('Name', '');
    setValue('Description', '');
    setValue('vacation', {});
    setValue('sick', {});
    setValue('outofoffice', {});
    setDropdownOptions([]);
    setValue('active');
    data?.map(item => {
      setValue(`custom_check${item?.id}`, false);
    });
  };

  const handleChecked = (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedValue(prev => {
        return [...prev, id];
      });
    } else {
      setCheckedValue(prev => prev.filter(item => item != id));
    }
  };
  useEffect(() => {
    setValue('leaveType', [...new Set(checkedValue)].toString());
    const matchingObjects = [];
    for (const obj of data) {
      if (checkedValue.includes(obj.id)) {
        matchingObjects.push(obj);
      }
    }
    setDropdownOptions(
      matchingObjects.map(item => {
        return {
          label: item?.name,
          value: item?.name,
          id: item?.id,
        };
      }),
    );
  }, [checkedValue]);
  return (
    <div className="personal-time-card-body personal-card-body edit-time-card-body">
      <div className="tab-content" id="myTabContentone">
        {/* Edit Time */}
        <div
          className="tab-pane fade show active"
          id="edit_time"
          role="tabpanel"
          aria-labelledby="edit-time"
        >
          <div className="form-group tab-form-group">
            <label className="custom_check d-inline-flex align-items-center">
              <Controller
                name="active"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="checkbox"
                    name="active"
                    onChange={onChange}
                    value={value}
                    checked={value}
                  />
                )}
              />
              {findLabelText('Active', 'Active', 'HR_Management')}{' '}
              <span className="checkmark" />
            </label>
          </div>
          <div className="form-group tab-form-group">
            <Controller
              name="Name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputComponent
                  module="HR_Management"
                  Label="Name"
                  name="Name"
                  placeholder=""
                  defaultFunc={false}
                  onChange={e => {
                    if (e.target.value.length > 50) {
                      setError({ ...error, name: true });
                      setTimeout(() => {
                        setError({ ...error, name: false });
                      }, 2000);
                    } else {
                      onChange(e);
                    }
                  }}
                  trigger={trigger}
                  value={value}
                  maxLength={50}
                />
              )}
            />
            {error.name ? (
              <Error>Maximum number of 50 characters exceeded</Error>
            ) : (
              <Error>{errors?.['Name']?.message}</Error>
            )}
          </div>
          <div className="form-group tab-form-group">
            <div className="permission-group">
              <div id="permission-accordion" className="permission-accordion">
                <div className="permission-header" id="heading-1">
                  <h5 className="permission-head hr-settings-collapse">
                    <Link
                      role="button"
                      data-bs-toggle="collapse"
                      to="#"
                      aria-expanded={
                        collapseClass.personalDetail == true ? 'true' : 'false'
                      }
                      aria-controls="collapse-1"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          personalDetail: !collapseClass.personalDetail,
                        })
                      }
                    >
                      {findLabelText(
                        'Leave_types',
                        'Leave types',
                        'HR_Management',
                      )}
                      <img
                        src={dropdown_angel}
                        alt="img"
                        className={
                          collapseClass.personalDetail
                            ? 'collapse-rotate'
                            : 'collapse-norotate'
                        }
                      />
                    </Link>
                  </h5>
                </div>
                <div
                  id="collapse-1"
                  className="collapse show"
                  style={{
                    display: `${
                      collapseClass.personalDetail == true ? 'block' : 'none'
                    }`,
                  }}
                >
                  <div className="permission-body">
                    <div className="permission-accordion-checkbox">
                      {data?.length > 0
                        ? data?.map((item, index) => {
                            return (
                              <label className="custom_check" key={index}>
                                <Controller
                                  name={`custom_check${item?.id}`}
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <input
                                      type="checkbox"
                                      value={value}
                                      checked={value}
                                      onChange={e => {
                                        onChange(e);
                                        handleChecked(e, item?.id);
                                      }}
                                    />
                                  )}
                                />
                                {item?.name} <span className="checkmark" />
                              </label>
                            );
                          })
                        : 'No data'}
                    </div>
                  </div>
                </div>
              </div>
              <Error>{errors?.['leaveType']?.message}</Error>
            </div>
          </div>
          <div className="form-group tab-form-group">
            <div className="permission-group">
              <div id="permission-accordion" className="permission-accordion">
                <div className="permission-header" id="heading-1">
                  <h5 className="permission-head hr-settings-collapse">
                    <Link
                      role="button"
                      data-bs-toggle="collapse"
                      to="#"
                      aria-expanded={
                        collapseClass.defaults == true ? 'true' : 'false'
                      }
                      aria-controls="collapse-1"
                      onClick={() =>
                        setCollapseClass({
                          ...collapseClass,
                          defaults: !collapseClass.defaults,
                        })
                      }
                    >
                      {findLabelText('Defaults', 'Defaults', 'HR_Management')}
                      <img
                        src={dropdown_angel}
                        alt="img"
                        className={
                          collapseClass.defaults
                            ? 'collapse-rotate'
                            : 'collapse-norotate'
                        }
                      />
                    </Link>
                  </h5>
                </div>
                <div
                  id="collapse-1"
                  className="collapse show"
                  style={{
                    display: `${
                      collapseClass.defaults == true ? 'block' : 'none'
                    }`,
                  }}
                >
                  <div className="permission-body">
                    <div className="permission-accordion-checkbox">
                      <div className="user-personal-details">
                        <div className="user-personal-inner">
                          <Row className="align-items-center">
                            <Col xl={8} lg={8} md={24} span={24}>
                              <div className="user-personal-label">
                                <label htmlFor="name">
                                  {findLabelText(
                                    'Vacation',
                                    'Vacation',
                                    'HR_Management',
                                  )}
                                </label>
                              </div>
                            </Col>
                            <Col xl={16} lg={16} md={24} span={24}>
                              <div className="user-personal-search">
                                <Controller
                                  name="vacation"
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <DropDownSelection
                                      options={dropdownOptions}
                                      minWidth="100px"
                                      height="35px"
                                      backgroundColor="#FFF"
                                      Value={value}
                                      onChange={val => {
                                        onChange(val);
                                        trigger('vacation');
                                      }}
                                      placeholder=""
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="user-personal-inner">
                          <Row className="align-items-center">
                            <Col xl={8} lg={8} md={24} span={24}>
                              <div className="user-personal-label">
                                <label htmlFor="name">
                                  {findLabelText(
                                    'Sick',
                                    'Sick',
                                    'HR_Management',
                                  )}
                                </label>
                              </div>
                            </Col>
                            <Col xl={16} lg={16} md={24} span={24}>
                              <div className="user-personal-search">
                                <Controller
                                  name="sick"
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <DropDownSelection
                                      options={dropdownOptions}
                                      minWidth="100px"
                                      height="35px"
                                      backgroundColor="#FFF"
                                      Value={value}
                                      onChange={val => {
                                        onChange(val);
                                        trigger('sick');
                                      }}
                                      placeholder=""
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div className="user-personal-inner">
                          <Row className="align-items-center">
                            <Col xl={8} lg={8} md={24} span={24}>
                              <div className="user-personal-label">
                                <label htmlFor="name">
                                  {findLabelText(
                                    'Out_of_office',
                                    'Out of office',
                                    'HR_Management',
                                  )}
                                </label>
                              </div>
                            </Col>
                            <Col xl={16} lg={16} md={24} span={24}>
                              <div className="user-personal-search">
                                <Controller
                                  name="outofoffice"
                                  control={control}
                                  render={({ field: { value, onChange } }) => (
                                    <DropDownSelection
                                      options={dropdownOptions}
                                      minWidth="100px"
                                      height="35px"
                                      backgroundColor="#FFF"
                                      Value={value}
                                      onChange={val => {
                                        onChange(val);
                                        trigger('outofoffice');
                                      }}
                                      placeholder=""
                                    />
                                  )}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group tab-form-group tab-description">
            <label>
              {findLabelText('Description', 'Description', 'HR_Management')}
            </label>
            <Controller
              name="Description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <textarea
                  value={value}
                  onChange={val => {
                    if (val.target.value.length > 300) {
                      setError({ ...error, Description: true });
                      setTimeout(() => {
                        setError({ ...error, Description: false });
                      }, 2000);
                      return;
                    }
                    onChange(val);
                    trigger('Description');
                  }}
                  name="Description"
                  className="form-control"
                  placeholder={'Optional \n\n\n\n Max 300 characters'}
                />
              )}
            />
            {error.Description ? (
              <Error>
                {
                  global.validationLabel.hrModuleValidation
                    .CharactersExceeded300
                }
              </Error>
            ) : (
              <Error>{errors?.['Description']?.message}</Error>
            )}
          </div>
          {Object.keys(editData)?.length > 0 && (
            <DeleteModel
              name={editData?.name}
              api={timeOffProfiles.Delete}
              payload={{ id: editData?.id }}
              setIsopened={setIsopened}
              listData={listData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTimeOffSettings;
