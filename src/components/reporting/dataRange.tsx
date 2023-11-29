import React, { useEffect, useRef, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, DatePicker, Dropdown, Input, Space } from 'antd';
import moment from 'moment';
import { dropdownAngle, monthIcon } from '../imagepath';
import { Link } from 'react-router-dom';

const DateRangePicker: React.FC = (props: any) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    initialValue,
    tabinfo,
  } = props;

  useEffect(() => {
    if (initialValue) {
      handleDateWithStartweek();
    }
  }, [initialValue]);

  moment.updateLocale('en', {
    week: {
      dow: 1,
    },
  });

  const { RangePicker } = DatePicker;
  const [selectedRange, setSelectedRange] = useState([
    moment().startOf('week'),
    moment(),
  ]);
  const [customStatus, setCustomStatus] = useState<any>();
  const [disabled, setDisabled] = useState(true);
  const [datePickerName, setDatePickerName] = useState<any>('Week to date');

  const [tempStartDate, setTempStartDate] = useState<any>(startDate);
  const [tempEndDate, setTempEndDate] = useState<any>(endDate);
  
  const handleDateWithStartweek = () => {
    setDisabled(true);
    setDatePickerName('Week to date');
    moment.updateLocale('en', {
      week: {
        dow: 1,
      },
    });
    const startDate = moment().startOf('week').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');
    const week_to_date = [moment().startOf('week'), moment()];
    setSelectedRange(week_to_date);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleDateWithPreviousweek = () => {
    setDisabled(true);
    setDatePickerName('Previous Week');
    moment.updateLocale('en', {
      week: {
        dow: 1,
      },
    });
    const startDate = moment()
      .subtract(1, 'week')
      .startOf('week')
      .format('YYYY-MM-DD');
    const endDate = moment()
      .subtract(1, 'week')
      .endOf('week')
      .format('YYYY-MM-DD');

    const previousWeekStart = moment().subtract(1, 'week').startOf('week');
    const previousWeekEnd = moment().subtract(1, 'week').endOf('week');
    const previousWeek = [previousWeekStart, previousWeekEnd];
    setSelectedRange(previousWeek);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleDateWithMonthToDate = () => {
    setDisabled(true);
    setDatePickerName('Month to date');
    const startOfMonth = moment().clone().startOf('month');
    const endOfMonth = moment();
    const startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
    const endDate = moment().format('YYYY-MM-DD');

    const monthTodate = [startOfMonth, endOfMonth];

    setSelectedRange(monthTodate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handlePastMonth = () => {
    setDisabled(true);
    setDatePickerName('Previous Month');
    const startDate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');
    const endDate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    const lastMonth = [
      moment().subtract(1, 'months').startOf('month'),
      moment().subtract(1, 'months').endOf('month'),
    ];
    setSelectedRange(lastMonth);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleDateWithQuarterDate = () => {
    setDisabled(true);
    setDatePickerName('Quarter to date');
    const startDate = moment().startOf('quarter').format('YYYY-MM-DD');
    const endDate = moment().endOf('day').format('YYYY-MM-DD');
    const startOfQuarter = moment().startOf('quarter');
    const endOfQuarter = moment().endOf('day');
    const QuarterTodate = [startOfQuarter, endOfQuarter];
    setSelectedRange(QuarterTodate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleDateWithPreviousQuarterDate = () => {
    setDisabled(true);
    setDatePickerName('Previous Quarter');
    const startDate = moment()
      .subtract(1, 'quarter')
      .startOf('quarter')
      .format('YYYY-MM-DD');
    const endDate = moment()
      .subtract(1, 'quarter')
      .endOf('quarter')
      .format('YYYY-MM-DD');
    const startOfPreviousQuarter = moment()
      .subtract(1, 'quarter')
      .startOf('quarter');
    const endOfPreviousQuarter = moment()
      .subtract(1, 'quarter')
      .endOf('quarter');

    const endOfPreviousQuarterDate = [
      startOfPreviousQuarter,
      endOfPreviousQuarter,
    ];
    setSelectedRange(endOfPreviousQuarterDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleYearToDate = () => {
    setDisabled(true);
    setDatePickerName('Year to date');
    const startDate = moment().startOf('year').format('YYYY-MM-DD');
    const endDate = moment().endOf('day').format('YYYY-MM-DD');

    const startOfYear = moment().startOf('year');
    const endOfYear = moment().endOf('day');
    const YearToDate = [startOfYear, endOfYear];
    setSelectedRange(YearToDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handlePastYear = () => {
    setDisabled(true);
    setDatePickerName('Previous Year');
    const startDate = moment()
      .startOf('year')
      .subtract(1, 'years')
      .format('YYYY-MM-DD');
    const endDate = moment()
      .endOf('year')
      .subtract(1, 'years')
      .format('YYYY-MM-DD');
    const lastYear = [
      moment().startOf('year').subtract(1, 'years'),
      moment().endOf('year').subtract(1, 'years'),
    ];
    setSelectedRange(lastYear);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCustomRangeChangeDateClick = () => {
    if (datePickerName == 'Custom date range') {
      setDisabled(false);
      setCustomStatus(true);
    }
  };

  const handleCustomRangeChange = () => {
    setDisabled(false);
    setDatePickerName('Custom date range');
    setCustomStatus(true);
  };

  const handleRangeChange = dates => {
    const [fromDate, toDate] = dates;
    const from_date = fromDate.format('YYYY-MM-DD');
    const to_date = toDate.format('YYYY-MM-DD');

    setTempStartDate(from_date);
    setTempEndDate(to_date);
    setDisabled(false);
    setDatePickerName('Custom date range');
    setSelectedRange(dates);
  };

  const handleRangeChangeCancel = () => {
    setCustomStatus(false);
  };

  const handleRangeChangeApply = () => {
    setCustomStatus(false);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  const handleReset = () => {
    setSelectedRange([]);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <a onClick={handleDateWithStartweek} rel="noopener noreferrer">
          Week to date
        </a>
      ),
      key: '1',
    },
    {
      label: (
        <a onClick={handleDateWithPreviousweek} rel="noopener noreferrer">
          Previous Week
        </a>
      ),
      key: '2',
    },
    {
      label: (
        <a onClick={handleDateWithMonthToDate} rel="noopener noreferrer">
          Month to date
        </a>
      ),
      key: '3',
    },
    {
      label: (
        <a onClick={handlePastMonth} rel="noopener noreferrer">
          Previous Month
        </a>
      ),
      key: '4',
    },
    {
      label: (
        <a onClick={handleDateWithQuarterDate} rel="noopener noreferrer">
          Quarter to date
        </a>
      ),
      key: '5',
    },
    {
      label: (
        <a
          onClick={handleDateWithPreviousQuarterDate}
          rel="noopener noreferrer"
        >
          Previous Quarter
        </a>
      ),
      key: '6',
    },
    {
      label: (
        <a onClick={handleYearToDate} rel="noopener noreferrer">
          Year to date
        </a>
      ),
      key: '7',
    },
    {
      label: (
        <a onClick={handlePastYear} rel="noopener noreferrer">
          Previous Year
        </a>
      ),
      key: '8',
    },
    {
      label: (
        <a rel="noopener noreferrer" onClick={handleCustomRangeChange}>
          Custom date range
        </a>
      ),
      key: '9',
    },
  ];
  const renderCustomFooter = () => (
    <div className="date-footer">
      <Link
        to="#"
        className="btn btn-secondary"
        onClick={() => handleRangeChangeCancel()}
      >
        Cancel
      </Link>
      <Link
        to="#"
        className="btn btn-primary"
        onClick={() => handleRangeChangeApply()}
      >
        Apply
      </Link>
    </div>
  );

  return (
    <>
      {tabinfo.id != 10 ? (
        <Dropdown menu={{ items }} className="antdd" trigger={['click']}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              <img src={monthIcon} alt="" />
              {datePickerName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <Dropdown menu={{ items }} className="antdd" trigger={['click']} disabled>
          <a className="arraow-none" onClick={e => e.preventDefault()}>
            <Space>
              <img src={monthIcon} alt="" />
              Today
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
      {/*     
      <Dropdown menu={{ items }} className="antdd" trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={monthIcon} alt="" />
            {datePickerName}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown> */}
      {tabinfo.id != 10 ? (
        <RangePicker
          open={customStatus}
          value={selectedRange}
          onChange={handleRangeChange}
          format="DD-MMM-YYYY" // Set the desired format for display
          onClick={handleCustomRangeChangeDateClick}
          className="antddrange"
          disabled={disabled}
          renderExtraFooter={renderCustomFooter}
        />
      ) : (
        <Input
          className="hr_today_input"
          value={moment().format('DD MMM YYYY')}
          disabled // Set the disabled prop to make the textbox disabled
        />
      )}

      <Link to="#" className="ms-4" onClick={() => handleReset()}>
        Reset
      </Link>
    </>
  );
};

export default DateRangePicker;
