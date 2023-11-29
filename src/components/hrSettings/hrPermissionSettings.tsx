import React, { useEffect, useState } from 'react';
import SelectOrCreatePermissionGroup from './premission/selectOrCreatePermissionGroup';
import PermissionGroupAccess from './premission/permissionGroupAccess';
import { Link } from 'react-router-dom';
import { postData } from '../../services/apicall';
import { hrFormFieldList, storeHrPermission } from '../../services/apiurl';
import {
  ErrorMessage,
  Errorcode,
  employeesGroupPermissionAccess,
  global,
} from '../../assets/constants/config';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import Toaster from '../toast';
import { HRSettingsContext } from '../context/context';
import { findLabelText } from '../commonMethod';

export const schemaValidationInName = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .max(
        300,
        global.validationLabel.hrModuleValidation.CharactersExceeded300,
      ),
    description: yup
      .string()
      .optional()
      .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
      .trim(),
    orgChart: yup.object().optional(),
  })
  .required();

export const schemaBasicValidation = yup
  .object({
    name: yup
      .string()
      .optional()
      .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
      .trim(),
    description: yup
      .string()
      .optional()
      .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
      .trim(),
    orgChart: yup.object().optional(),
  })
  .required();

interface Group {
  id: number;
  group_name?: string;
  description?: string;
  label: string;
  value: number;
}
const HrPermissionSettings = () => {
  const [selectedGroup, updateSelectedGroup] = useState<Group>();
  const [permissionGroupAccess, setPermissionGroupAccess] = useState<number>();
  const [allPermissionStatus, setAllPermissionStatus] =
    useState<boolean>(false);
  const [tab, setTab] = useState('1');
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      selectedGroup && selectedGroup?.id
        ? schemaBasicValidation
        : schemaValidationInName,
    ),
  });

  const dispatch = useDispatch();

  const [allPermissionList, setAllPermissionList] = useState<any>({});
  const [height, setHeight] = useState<any>(window.innerHeight);
  const [scrollHeight, setScrollHeight] = useState<any>();
  const [leftScrollHeight, setLeftScrollHeight] = useState<any>();
  const [isRefresh, setIsRefresh] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupAccess, updatateGrpAccess] = useState(
    employeesGroupPermissionAccess[0],
  );
  const [selectedPermissionTab, updatedPermissionTab] = useState<any>({});

  const getAllFields = () => {
    dispatch(showLoader());
    const payload = {
      group_id: selectedGroup && selectedGroup?.id ? selectedGroup?.id : '0',
    };
    postData(hrFormFieldList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        setAllPermissionList(data);
        setAllPermissionStatus(true);
      }
    });
  };

  useEffect(() => {
    if (selectedGroup) {
      getAllFields();
    }
  }, [selectedGroup]);

  const disabledButton =
    selectedGroup?.id == 1 || selectedGroup?.id == 2 || selectedGroup?.id == 3;

  const onSubmitPermission = data => {
    const preparData = {
      group_id: selectedGroup && selectedGroup?.id ? selectedGroup?.id : '0', // if null 0
      group_name: data?.name ? data.name : '',
      description: data?.description ? data?.description : '',
      org_chart: data?.orgChart?.value ? data?.orgChart?.value : '0',
      can_access: permissionGroupAccess,
      permission_type: selectedPermissionTab?.type,
      [`${selectedPermissionTab.key}`]:
        allPermissionList?.[`${selectedPermissionTab.key}`],
    };
    dispatch(showLoader());
    postData(storeHrPermission, preparData, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
        getAllFields();
        setIsRefresh(Math.random());
      } else if (res?.data?.code == 204) {
        Toaster(Errorcode, res?.data?.message);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
      resetData();
    });
  };

  const formKeys = {
    name: 'name',
    description: 'description',
    orgChart: 'orgChart',
  };

  const resetData = () => {
    setValue(formKeys.name, '');
    setValue(formKeys.description, '');
    setValue(formKeys.orgChart, {});
    updateSelectedGroup(null);
  };

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  const headerHeight = document?.querySelector('.header')?.clientHeight;
  const tabHeader = document?.querySelector(
    '.manager-tab-header',
  )?.clientHeight;
  const leftHeader = document?.querySelector(
    '.personal-group-info',
  )?.clientHeight;
  const groupHeader = document?.querySelector(
    '.permission-group-header',
  )?.clientHeight;
  const about = document?.querySelector('.permission-about')?.clientHeight;
  const innerTabHeader = document?.querySelector(
    '.permission-tab-info .manager-tab-header',
  )?.clientHeight;
  const calHeight =
    headerHeight + tabHeader + groupHeader + about + innerTabHeader;
  const calLeftHeight = headerHeight + tabHeader + leftHeader;

  useEffect(() => {
    const sHeight = height - calHeight - 70;
    const sLheight = height - calLeftHeight - 70;
    setScrollHeight(!Number.isNaN(sHeight) && sHeight);
    setLeftScrollHeight(!Number.isNaN(sLheight) && sLheight);
  }, [height, calHeight]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const gotoBlankScreen = () => {
    setIsOpen(false);
    resetData();
  };

  return (
    <HRSettingsContext.Provider
      value={{
        allPermissionList,
        updatateGrpAccess,
        selectedGroupAccess,
        permissionGroupAccess,
        setPermissionGroupAccess,
        setAllPermissionList,
        setTab,
        tab,
        scrollHeight,
        leftScrollHeight,
        allPermissionStatus,
        setAllPermissionStatus,
      }}
    >
      <div
        className="tab-pane fade show active"
        id="permission_tab"
        role="tabpanel"
        aria-labelledby="permission-tab"
      >
        <div className="permission-grid">
          <SelectOrCreatePermissionGroup
            updateSelectedGroup={updateSelectedGroup}
            selectedGroup={selectedGroup}
            trigger={trigger}
            setValue={setValue}
            control={control}
            errors={errors}
            isRefresh={isRefresh}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            updatedPermissionTab={updatedPermissionTab}
            onChangeData={(key, value) => {
              setValue(key, value);
            }}
          />
          <PermissionGroupAccess
            selectedGroup={selectedGroup}
            updatedPermissionTab={updatedPermissionTab}
            selectedPermissionTab={selectedPermissionTab}
            isOpen={isOpen}
            control={control}
            setValue={setValue}
          />

          <div className="permission-footer">
            <div className="personal-footer" style={{ minHeight: '50px' }}>
              {selectedGroup?.id || isOpen ? (
                <>
                  <Link to={''} className="btn" onClick={gotoBlankScreen}>
                    {findLabelText('Cancel', 'Cancel', 'HR_Management')}
                  </Link>
                  <Link
                    onClick={handleSubmit(onSubmitPermission)}
                    to={''}
                    className={`btn btn-primary ${
                      (tab == '1'
                        ? permissionGroupAccess > 0
                        : permissionGroupAccess >= 0) && !disabledButton
                        ? ''
                        : 'disable'
                    }`}
                  >
                    {findLabelText('Save', 'Save', 'HR_Management')}
                  </Link>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </HRSettingsContext.Provider>
  );
};

export default HrPermissionSettings;
