import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import {
  child_icon,
  compassion,
  jury,
  other_icon,
  pencilIcon,
  publicHoliday,
  timeOff_2,
  timeOff_3,
  training_icon,
} from '../../imagepath';
import { PersonalContext } from '../personalController';
import { leaveKeys, sectionNames } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';

const LeaveTable = ({ setRightScreen }) => {
  const {
    setEditBookOff,
    upcomingData,
    pastData,
    allFieldPermissionType,
    scrollHeightForLeave,
    leaveId,
    getListData,
  } = useContext(PersonalContext);
  const getIconImage = type => {
    switch (type) {
      case 'annual_leave_icon':
        return timeOff_2;
      case 'holiday_icon':
        return publicHoliday;
      case 'sick_icon':
        return timeOff_3;
      case 'compassion_icon':
        return compassion;
      case 'childcare_icon':
        return child_icon;
      case 'paternity_icon':
        return child_icon;
      case 'maternity_icon':
        return child_icon;
      case 'furlough_icon':
        return other_icon;
      case 'other_icon':
        return other_icon;
      case 'toil_icon':
        return other_icon;
      case 'training_icon':
        return training_icon;
      case 'jury_icon':
        return jury;
      default:
        '';
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  const findIndex = key => {
    const findObj = allFieldPermissionType.filter(
      obj => obj.section_name == sectionNames.leave && obj.field_name == key,
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
    if (leaveId != '') {
      setEditBookOff(upcomingData?.find(item => item?.id == leaveId));
      setRightScreen(true);
    }
  }, [leaveId, upcomingData]);

  const column = [
    {
      title: `${findLabelText('Dates', 'Dates', 'Hr')}`,
      dataIndex: 'formated_date',
      className: 'data-date-info',
      render: text =>
        text == 'Upcoming' || text == 'Past' ? (
          <div className="time-data">
            <h6>{findLabelText(text, text, 'Hr')}</h6>
          </div>
        ) : (
          <div className="time-data">{text}</div>
        ),
    },
    {
      title: `${findLabelText('Duration', 'Duration', 'Hr')}`,
      dataIndex: 'duration',
      className: 'data-duration-info',
      render: text => <div className="duration-data">{text}</div>,
    },
    {
      title: `${findLabelText('Type', 'Type', 'Hr')}`,
      dataIndex: 'type',
      className: 'data-type-info',
      render: (text, record) =>
        record?.formated_date == 'Upcoming' ? (
          <></>
        ) : (
          <div className="time-data-icon">
            <img src={getIconImage(record?.icon_type)} alt="" /> {text}
          </div>
        ),
    },
    {
      title: `${findLabelText('Status-Details', 'Status/Details', 'Hr')}`,
      dataIndex: 'status',
      className: 'data-date-info',
      render: (text, record) =>
        record?.formated_date == 'Upcoming' ||
        record?.formated_date == 'Past' ? (
          <></>
        ) : (
          <div className="time-status">
            <p>{text}</p>
            <span
              className={`${
                text == 'Confirmed'
                  ? 'success-status'
                  : text == 'Rejected'
                  ? 'danger-status'
                  : 'warning-status'
              }`}
            ></span>
          </div>
        ),
    },
    {
      title: `${findLabelText('Notes', 'Notes', 'Hr')}`,
      dataIndex: 'notes',
      className: 'hr-data-notes',
      render: text => <div>{text}</div>,
    },
    {
      title: '',
      className: 'data-notes-info',
      render: (text, record) =>
        record?.formated_date == 'Upcoming' ||
        record?.type == 'Holiday' ||
        record?.table_type == 'Past' ||
        record?.type == 'Public holiday' ? (
          <></>
        ) : (
          <div className="edit-pencil-icon">
            {findIndex(leaveKeys.BookTimeOff) == '2' && (
              <Link
                to="#"
                onClick={() => {
                  setEditBookOff(record);
                  setRightScreen(true);
                }}
              >
                <img src={pencilIcon} alt="" />
              </Link>
            )}
          </div>
        ),
    },
  ];

  const data = [...upcomingData, ...pastData];
  return (
    <div className="table-responsive">
      <Table
        dataSource={findIndex(leaveKeys.upcoming) == '0' ? pastData : data}
        columns={column}
        className="table time-off-table"
        pagination={false}
        rowKey={record => record.id}
        scroll={{
          y: !Number.isNaN(scrollHeightForLeave)
            ? scrollHeightForLeave - 50
            : 0,
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default LeaveTable;
