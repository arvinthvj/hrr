import React, { useContext, useEffect, useState } from 'react';
import { PermissionSection } from './permissionComponents';
import { permission_04, permission_05 } from '../../imagepath';
import { HRSettingsContext } from '../../context/context';
import { findLabelText } from '../../commonMethod';

const TimeOff = () => {
  const {
    scrollHeight,
    allPermissionStatus,
    allPermissionList,
    setAllPermissionList,
    setAllPermissionStatus,
  } = useContext(HRSettingsContext);
  const { leave } = allPermissionList;

  const { basicLeave, bookConfigure } = leave?.leave_details?.reduce(
    (acc, item) => {
      if (item.field_name === 'upcoming' || item.field_name === 'pastbooking') {
        acc.basicLeave.push(item);
      } else {
        acc.bookConfigure.push(item);
      }
      return acc;
    },
    { basicLeave: [], bookConfigure: [] },
  );
  const [basicPermissionList, updateBasicPermissionList] = useState(basicLeave);

  const [bookConfigurationList, updateBookConfigurationList] =
    useState(bookConfigure);

  useEffect(() => {
    if (leave && allPermissionStatus) {
      if (leave?.leave_details.length > 0) {
        const { basic, bookConfigure } = leave?.leave_details?.reduce(
          (acc, item) => {
            if (
              item.field_name === 'upcoming' ||
              item.field_name === 'pastbooking'
            ) {
              acc.basic.push(item);
            } else {
              acc.bookConfigure.push(item);
            }
            return acc;
          },
          { basic: [], bookConfigure: [] },
        );
        updateBasicPermissionList(basic);
        updateBookConfigurationList(bookConfigure);
        setAllPermissionStatus(false);
      }
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      leave: {
        leave_details: [...basicPermissionList, ...bookConfigurationList],
      },
    });
  }, [basicPermissionList, bookConfigurationList]);
  return (
    <div
      className="tab-pane fade show active"
      id="time_tab"
      role="tabpanel"
      aria-labelledby="time-tab"
    >
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_04}
          title={findLabelText('Basic', 'Basic', 'HR_Management')}
          list={basicPermissionList}
          updatePermission={updateBasicPermissionList}
        />
        <PermissionSection
          image={permission_05}
          title={findLabelText(
            'Book_Configure',
            'Book & Configure',
            'HR_Management',
          )}
          list={bookConfigurationList}
          updatePermission={updateBookConfigurationList}
        />
      </div>
    </div>
  );
};

export default TimeOff;
