import React, { useContext } from 'react';
import PremissionTabList from './premissionTabList';
import TimeOff from './timeOff';
import {
  employeesGroupPermissionAccess,
  hrPermissionTabs,
} from '../../../assets/constants/config';
import Personal from './personal';
import Job from './job';
import Preferences from './preferences';
import Benefits from './benefits';
import Assets from './assets';
import Notices from './notices';
import DropDownSelection from '../../selectfield/dropDownSelection';
import { HRSettingsContext } from '../../context/context';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { findLabelText } from '../../commonMethod';

const ChooseTeam = ({ selectedGroup, isOpen, control, setValue }) => {
  const { tab, setTab, setPermissionGroupAccess } =
    useContext(HRSettingsContext);

  return (
    <div className="permission-about">
      <Link
        to={''}
        onClick={() => {
          setTab('1');
        }}
        className={
          tab == '1' && (selectedGroup?.id || isOpen)
            ? 'permission-about-left permission-about-active'
            : 'permission-about-left permission-about-unactive'
        }
      >
        <h6>
          {findLabelText(
            'About_other_employees',
            'About other employees',
            'HR_Management',
          )}
        </h6>
        <p>
          {findLabelText(
            'Choose_whether_this_group_can_access_users_by',
            'Choose whether this group can access users by',
            'HR_Management',
          )}
        </p>
        <div className="personal-group">
          <Controller
            name="dropdown"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DropDownSelection
                isDisabled={
                  tab == '1' && (selectedGroup?.id || isOpen) ? false : true
                }
                options={employeesGroupPermissionAccess}
                minWidth="100px"
                height="35px"
                backgroundColor="#FFF"
                onChange={value => {
                  onChange(value);
                  setPermissionGroupAccess(value?.id);
                }}
                Value={value}
              />
            )}
          />
        </div>
      </Link>

      <Link
        to={''}
        onClick={() => {
          setTab('2');
          selectedGroup?.id || isOpen
            ? setPermissionGroupAccess(0)
            : setPermissionGroupAccess();
          setValue('dropdown', {});
        }}
        className={
          tab == '2' && (selectedGroup?.id || isOpen)
            ? 'permission-about-right permission-about-active'
            : 'permission-about-right permission-about-unactive'
        }
      >
        <h6>
          {findLabelText(
            'See_about_themselves',
            'See about themselves',
            'HR_Management',
          )}
        </h6>
        <p>
          {findLabelText(
            'What_users_in_this_permission_group_can_access_about_themselves',
            'What users in this permission group can access about themselves',
            'HR_Management',
          )}
        </p>
      </Link>
    </div>
  );
};

const PermissionGroupAccess = ({
  selectedPermissionTab,
  updatedPermissionTab,
  selectedGroup,
  isOpen,
  control,
  setValue,
}) => {
  const { scrollHeight } = useContext(HRSettingsContext);

  return (
    <div className="permission-right">
      <div className="permission-group-header">
        <h4>
          {findLabelText(
            'What_this_permission_group_can_access',
            'What this permission group can access',
            'HR_Management',
          )}
        </h4>
      </div>
      <ChooseTeam
        selectedGroup={selectedGroup}
        isOpen={isOpen}
        control={control}
        setValue={setValue}
      />
      <div className="permission-right-tab">
        <PremissionTabList
          selectedPermissionTab={selectedPermissionTab}
          updatedPermissionTab={updatedPermissionTab}
          selectedGroup={selectedGroup}
          isOpen={isOpen}
        />

        <div
          style={{ height: scrollHeight }}
          className="tab-content permission-tab-content"
          id="myTabContentone"
        >
          {selectedPermissionTab?.type == hrPermissionTabs?.leave &&
          (selectedGroup?.id || isOpen) ? (
            <TimeOff />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.personal &&
            (selectedGroup?.id || isOpen) ? (
            <Personal />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.job &&
            (selectedGroup?.id || isOpen) ? (
            <Job />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.preferences &&
            (selectedGroup?.id || isOpen) ? (
            <Preferences />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.benefits &&
            (selectedGroup?.id || isOpen) ? (
            <Benefits />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.assets &&
            (selectedGroup?.id || isOpen) ? (
            <Assets />
          ) : selectedPermissionTab?.type == hrPermissionTabs?.notices &&
            (selectedGroup?.id || isOpen) ? (
            <Notices />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PermissionGroupAccess;
