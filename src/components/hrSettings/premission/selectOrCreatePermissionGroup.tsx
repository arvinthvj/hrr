import React, { useContext, useEffect, useState } from 'react';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { postData } from '../../../services/apicall';
import {
  hrPermissionGroupDelete,
  hrPermissionGroupList,
} from '../../../services/apiurl';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import {
  ErrorMessage,
  Errorcode,
  global,
  hrPermissionTabListOption,
  selectedPermission,
} from '../../../assets/constants/config';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import Toaster from '../../toast';
import { dropdown_angel } from '../../imagepath';
import { HRSettingsContext } from '../../context/context';
import { findLabelText } from '../../commonMethod';
type ErrorComponent = styled<'p', any, never>;
const Error: ErrorComponent = styled.p({
  color: 'red',
});

const SelectOrCreatePermissionGroup = ({
  onChangeData,
  errors,
  control,
  trigger,
  setValue,
  selectedGroup,
  updateSelectedGroup,
  isRefresh,
  isOpen,
  setIsOpen,
  updatedPermissionTab,
}) => {
  const [permissionGrpList, updatePermissionGrpList] = useState<
    Array<{ label: string; value: string; id: number }>
  >([]);
  const [nameLimitExceeded, setNameLimitExceeded] = useState(false);
  const [showGroupsDropDown, setShowGroupsDropDown] = useState(false);

  const [descriptionLimitExceeded, setDescriptionLimitExceeded] =
    useState(false);
  const dispatch = useDispatch();
  const formKeys = {
    name: 'name',
    description: 'description',
    orgChart: 'orgChart',
  };

  const { setTab, setPermissionGroupAccess, leftScrollHeight } =
    useContext(HRSettingsContext);

  const getPermissionGroupList = () => {
    postData(hrPermissionGroupList, '', (data, res) => {
      if (res?.data?.code == 200) {
        const list: any = [];
        for (const obj of data) {
          const preparObj = { ...obj, value: obj.id, label: obj.group_name };
          list.push(preparObj);
        }
        updatePermissionGrpList(list);
        updateSelectedGroup({});
      }
    });
  };

  useEffect(() => {
    getPermissionGroupList();
  }, [isRefresh]);

  const deleteGroup = (id: string) => {
    dispatch(showLoader());
    postData(hrPermissionGroupDelete, { id: id }, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        getPermissionGroupList();
        Toaster(res?.data?.code, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  useEffect(() => {
    if (selectedGroup) {
      setValue(formKeys.name, selectedGroup?.group_name);
      setValue(formKeys.description, selectedGroup?.description);
    }
  }, [selectedGroup]);

  const resetData = () => {
    setValue(formKeys.name, '');
    setValue(formKeys.description, '');
  };

  return (
    <div className="permission-left">
      <div className="personal-group-info">
        <div className="personal-group">
          <label>
            {findLabelText(
              'Select_permission_group_or_create_new',
              'Select permission group or create new',
              'HR_Management',
            )}
          </label>
          <div className="notices-dropdown manager-dropdown manager-dropdown-inner">
            <Link
              to={''}
              onClick={() => {
                setShowGroupsDropDown(!showGroupsDropDown);
              }}
              className="dropdown-toggle"
            >
              {selectedGroup?.label ? selectedGroup?.label : ''}
              <img
                src={dropdown_angel}
                className={
                  showGroupsDropDown ? 'collapse-rotate' : 'collapse-norotate'
                }
              />
            </Link>
            {showGroupsDropDown && (
              <div className="dropdown-menu-show dropdown-menu-end">
                <Link
                  to={''}
                  onClick={() => {
                    setShowGroupsDropDown(false);
                    updateSelectedGroup({});
                    resetData();
                    setIsOpen(true);
                    updatedPermissionTab({
                      ...hrPermissionTabListOption[0],
                    });
                  }}
                  className="dropdown-item new-group-item"
                >
                  <i className="fas fa-plus" />
                  {findLabelText(
                    'Create_a_new_group',
                    'Create a new group',
                    'HR_Management',
                  )}
                </Link>
                {permissionGrpList &&
                  permissionGrpList?.length > 0 &&
                  permissionGrpList.map((obj, index) => {
                    return (
                      <Link
                        key={index}
                        to={''}
                        onClick={() => {
                          setShowGroupsDropDown(false);
                          updateSelectedGroup(obj);
                          setTab('2');
                          setPermissionGroupAccess(0);
                          setIsOpen(true);
                        }}
                      >
                        {obj.label}
                        {obj?.id != 1 && obj?.id != 2 && obj?.id != 3 ? (
                          <Link
                            to={''}
                            className="btn"
                            onClick={() => {
                              setShowGroupsDropDown(false);
                              deleteGroup(obj.value);
                            }}
                          >
                            <i className="far fa-trash-can" />
                          </Link>
                        ) : (
                          <></>
                        )}
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="permission-group-info"
        style={{ height: leftScrollHeight }}
      >
        {isOpen ? (
          <>
            <div className="permission-group">
              <label>{findLabelText('Name', 'Name', 'HR_Management')}</label>
              <Controller
                name={formKeys.name}
                control={control}
                render={({ field: { value } }) => (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Team manager"
                    onChange={e => {
                      trigger(formKeys.name);
                      const lenthValidation = 300;
                      if (
                        e?.target?.value.toString().length > lenthValidation
                      ) {
                        setNameLimitExceeded(true);
                      } else {
                        setNameLimitExceeded(false);
                        onChangeData(formKeys.name, e?.target?.value);
                      }
                    }}
                    value={value}
                  />
                )}
              />
              {nameLimitExceeded ? (
                <Error>
                  {
                    global.validationLabel.hrModuleValidation
                      .CharactersExceeded300
                  }
                </Error>
              ) : (
                <Error>{errors?.[formKeys.name]?.message}</Error>
              )}
            </div>
            <div className="permission-group">
              <label>
                {findLabelText('Description', 'Description', 'HR_Management')}
              </label>
              <Controller
                name={formKeys.description}
                control={control}
                render={({ field: { value } }) => (
                  <textarea
                    className="form-control"
                    placeholder={'Optional \n\n\n\n Max 300 characters'}
                    onChange={e => {
                      trigger(formKeys.description);
                      const lenthValidation = 300;
                      if (
                        e?.target?.value.toString().length > lenthValidation
                      ) {
                        setDescriptionLimitExceeded(true);
                      } else {
                        setDescriptionLimitExceeded(false);
                        onChangeData(formKeys.description, e?.target?.value);
                      }
                    }}
                    value={value}
                    defaultValue={''}
                  />
                )}
              />
              {descriptionLimitExceeded ? (
                <Error>
                  {
                    global.validationLabel.hrModuleValidation
                      .CharactersExceeded300
                  }
                </Error>
              ) : (
                <Error>{errors?.[formKeys.description]?.message}</Error>
              )}
            </div>
            <div className="permission-group">
              <label>
                {findLabelText('Org_chart', 'Org chart', 'HR_Management')}
              </label>
              <DropDownSelection
                options={[
                  { value: selectedPermission.view, label: 'View' },
                  { value: selectedPermission.edit, label: 'View/Edit' },
                  { value: selectedPermission.lock, label: 'No access' },
                ]}
                minWidth="100px"
                height="35px"
                backgroundColor="#FFF"
                onChange={value => {
                  onChangeData(formKeys.orgChart, value);
                }}
                placeholder="View/edit/no access"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SelectOrCreatePermissionGroup;
