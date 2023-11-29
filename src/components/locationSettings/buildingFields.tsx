import React, { useContext, useState } from 'react';
import { Controller } from 'react-hook-form';
import { findLabelText } from '../commonMethod';
import SelectField from '../selectfield/select';
import { CreateOrEditLocationContext } from '../context/context';
import { Link } from 'react-router-dom';
import { dropdownAngle, dropdown_angel } from '../imagepath';
import { EndTimePicker } from './endTimePicker';
import { StartTimePicker } from './startTimePicker';
import { Col, Row } from 'antd';

const BuildingFields = () => {
  const {
    languageList,
    timeZoneList,
    currencyList,
    weekstart,
    defaultworkingweek,
    setDefaultworkingWeek,
    hoursList,
    validateDefaultDayAndHours,
    setHoursList,
    control,
    trigger,
    errors,
  } = useContext(CreateOrEditLocationContext);
  const [workweekCollapse, setWorkweekCollapse] = useState(true);
  const [openhourCollapse, setOpenhourCollapse] = useState(true);

  const updateValues = (opt, index) => {
    const list: any = defaultworkingweek;
    list[index].selected = opt.selected == '1' ? '0' : '1';
    setDefaultworkingWeek([...list]);
  };
  return (
    <Row>
      <Col lg={24} className="locate-teamdetails px-0 bg-white-select">
        <div className="locate-select locate-inner-select pt-0">
          <label htmlFor="name">
            {findLabelText('Default_language', 'Default language', 'Location')}
          </label>
          <Controller
            name="language"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <SelectField
                  bgColor={'#FFFFFF'}
                  value={languageList?.filter(
                    option => option?.id == value?.id,
                  )}
                  options={languageList}
                  height={'40px'}
                  onChangeValue={val => {
                    onChange(val);
                    trigger('language');
                  }}
                  placeholder={findLabelText(
                    'Please_select_language',
                    'Please select language',
                    'Common_Values',
                  )}
                />
                {errors.language?.value?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.language?.value?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24} className="locate-teamdetails px-0 bg-white-select">
        <div className="locate-select locate-inner-select pt-0">
          <label htmlFor="name">
            {findLabelText('Timezone', 'Timezone', 'Location')}
          </label>
          <Controller
            name="timezone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <SelectField
                  bgColor={'#FFFFFF'}
                  value={timeZoneList?.filter(
                    option => option?.id == value?.id,
                  )}
                  options={timeZoneList}
                  height={'40px'}
                  onChangeValue={val => {
                    onChange(val);
                    trigger('timezone');
                  }}
                  placeholder={findLabelText(
                    'Please_select_time_zone',
                    'Please select time zone',
                    'Common_Values',
                  )}
                />
                {errors.timezone?.value?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.timezone?.value?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24} className="locate-teamdetails px-0 bg-white-select">
        <div className="locate-select locate-inner-select pt-0">
          <label htmlFor="name">
            {findLabelText('Currency', 'Currency', 'Location')}
          </label>
          <Controller
            name="currency"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <SelectField
                  bgColor={'#FFFFFF'}
                  value={currencyList?.filter(
                    option => option?.id == value?.id,
                  )}
                  options={currencyList}
                  height={'40px'}
                  onChangeValue={val => {
                    onChange(val);
                    trigger('currency');
                  }}
                  placeholder={findLabelText(
                    'Please_select_currency',
                    'Please select currency',
                    'Common_Values',
                  )}
                />
                {errors.currency?.value?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.currency?.value?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24} className="locate-teamdetails px-0 bg-white-select">
        <div className="locate-select locate-inner-select pt-0">
          <label htmlFor="name">
            {findLabelText('Week_start', 'Week start', 'Location')}
          </label>
          <Controller
            name="weekstart"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <SelectField
                  bgColor={'#FFFFFF'}
                  value={weekstart?.filter(option => option?.id == value?.id)}
                  options={weekstart}
                  height={'40px'}
                  onChangeValue={val => {
                    onChange(val);
                    trigger('weekstart');
                  }}
                  placeholder={findLabelText(
                    'Please_select_weekstart',
                    'Please select weekstart',
                    'Common_Values',
                  )}
                />
                {errors.weekstart?.value?.message ? (
                  <label style={{ color: 'red' }}>
                    {errors.weekstart?.value?.message}
                  </label>
                ) : null}
              </>
            )}
          />
        </div>
      </Col>
      <Col lg={24} className="locate-manage my-3">
        <div className="locate-managehead locate-managehead-inner">
          <Link
            data-bs-toggle="collapse"
            to="#locate"
            role="button"
            aria-expanded={workweekCollapse ? 'false' : 'true'}
            aria-controls="locate"
            onClick={() => setWorkweekCollapse(!workweekCollapse)}
          >
            {findLabelText(
              'Default_working_week',
              'Default working week',
              'Location',
            )}{' '}
            <img
              src={dropdownAngle}
              alt="img"
              className={
                workweekCollapse ? 'collapse-rotate' : 'collapse-norotate'
              }
            />
          </Link>
        </div>
        <div
          className="collapse show"
          id="locate"
          style={{ display: workweekCollapse ? 'block' : 'none' }}
        >
          <div className="locate-managename p-0">
            <div className="locate-setscheck locate-setscheck-info">
              <ul>
                {defaultworkingweek?.length > 0
                  ? defaultworkingweek?.map((week, index) => {
                      return (
                        <li key={index}>
                          <h4>
                            {findLabelText(
                              week?.label,
                              week?.label,
                              'Location',
                            )}
                          </h4>
                          <div className="checkbox-set">
                            <label className="check">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  updateValues(week, index);
                                }}
                                defaultChecked={
                                  week.selected == '1' ? true : false
                                }
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </Col>

      <Col lg={24} className="locate-manage my-3">
        <div className="locate-managehead locate-managehead-inner">
          <Link
            data-bs-toggle="collapse"
            to="#locates"
            role="button"
            aria-expanded={openhourCollapse ? 'false' : 'true'}
            aria-controls="locate"
            onClick={() => setOpenhourCollapse(!openhourCollapse)}
          >
            {findLabelText('Opening_Hours', 'Opening Hours', 'Common_Values')}{' '}
            <img
              src={dropdown_angel}
              alt="img"
              className={
                openhourCollapse ? 'collapse-rotate' : 'collapse-norotate'
              }
            />
          </Link>
        </div>
        <div
          className="collapse show"
          id="locates"
          style={{ display: openhourCollapse ? 'block' : 'none' }}
        >
          <div className="locate-managename p-0">
            <div className="locate-setscheck locate-setscheck-info">
              <ul>
                {hoursList?.length > 0
                  ? hoursList?.map((list, index) => {
                      if (!validateDefaultDayAndHours(list)) {
                        // if (list.selected == "0") {
                        return (
                          <li key={index}>
                            <h4>
                              {findLabelText(
                                list?.days,
                                list?.days,
                                'Location',
                              )}
                            </h4>
                            <div className="time-estimation">
                              <h6>
                                {findLabelText('Closed', 'Closed', 'Location')}
                              </h6>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <h4>
                              {findLabelText(
                                list?.days,
                                list?.days,
                                'Location',
                              )}
                            </h4>
                            <div className="time-estimation time-estimation-info time-estimation-inner">
                              <StartTimePicker
                                start_time={list.start_time}
                                endTime={list.end_time}
                                onSubmitStartTime={time => {
                                  hoursList[index]['start_time'] = time;
                                  setHoursList([...hoursList]);
                                }}
                              />
                              <span> - </span>
                              <EndTimePicker
                                startTime={list.start_time}
                                end_time={list.end_time}
                                onSubmitEndTime={time => {
                                  hoursList[index]['end_time'] = time;
                                  setHoursList([...hoursList]);
                                }}
                              />
                            </div>
                          </li>
                        );
                      }
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default BuildingFields;
