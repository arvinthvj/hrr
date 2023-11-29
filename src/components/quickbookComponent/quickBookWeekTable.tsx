import React, { useContext, useEffect, useState } from 'react';
import { QuickBookTabContext } from '../context/context';
import {
  in_office,
  other_icon,
  out_office,
  remote_home,
  schedule_03,
  sickness,
  WorkspacesIcon
} from '../imagepath';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { endOfMonth, startOfMonth } from '../commonMethod';
import { postData } from '../../services/apicall';
import { GetWeeklySchedule } from '../../services/apiurl';
import { deskFilter } from '../../assets/constants/config';
import WarningModal from '../Modal/warningModal';
import { QuickbookLabels, QuickbookWeekStatus } from './constant';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';

interface QuickBookWeekProps {
  setBtnDisable: CallableFunction;
  bookedFor: Object;
  setLoading: CallableFunction;
  setConformData: CallableFunction;
}

const QuickBookWeekScheduleTable: React.FC<QuickBookWeekProps> = ({
  setBtnDisable,
  bookedFor,
  setLoading,
  setConformData,
}) => {
  const { assetData } = useContext(QuickBookTabContext);
  const { quickbookFromDate, quickbookToDate } = useSelector(
    (state: any) => state?.quickBook,
  );
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [nextMonth, setNextMonth] = useState(null);
  const [remotedays, setRemotedays] = useState<any>();
  const [remoteNextMonthdays, setRemoteNextMonthdays] = useState<any>();
  const [remoteMonth, setRemoteMonth] = useState<any>();
  const [scheduleDataCopy, setScheduleDataCopy] = useState({});
  const [allot, setAllot] = useState(false);
  const currentDate = moment().format('ddd DD').substring(0, 6);

  useEffect(() => {
    saveUdate();
  }, [scheduleData]);
  const saveUdate = () => {
    const data: any = [];
    const dataCopy: any = [];
    if (scheduleData) {
      delete scheduleData['remotedays_count'];
      delete scheduleData['remotedays_monthcount'];
      delete scheduleData['sremotedays_count'];
      delete scheduleDataCopy['remotedays_count'];
      delete scheduleDataCopy['remotedays_monthcount'];
      delete scheduleDataCopy['sremotedays_count'];
      Object.keys(scheduleData)?.length > 0 &&
        Object.keys(scheduleData)?.forEach(e1 => {
          data?.push(scheduleData[e1]);
        });
      Object.keys(scheduleDataCopy)?.length > 0 &&
        Object.keys(scheduleDataCopy)?.forEach(e1 => {
          dataCopy?.push(scheduleDataCopy[e1]);
        });
      const list = data?.filter(
        (item: any) =>
          !dataCopy?.some(
            itemToBeRemoved =>
              itemToBeRemoved.work_place === item?.work_place &&
              itemToBeRemoved.schedule_date === item?.schedule_date,
          ),
      );
      setConformData(list?.length > 0 ? list : []);
      setBtnDisable(list?.length > 0 ? true : false);
    }
  };

  const getImg = item => {
    let image;
    switch (item) {
      case QuickbookWeekStatus.Workspace:
        image = WorkspacesIcon;
        break;
      case QuickbookWeekStatus.remote:
        image = remote_home;
        break;
      case QuickbookWeekStatus.outOfOffice:
        image = out_office;
        break;
      case QuickbookWeekStatus.sick:
        image = sickness;
        break;
      case QuickbookWeekStatus.vacation:
        image = schedule_03;
        break;
      case QuickbookWeekStatus.other:
        image = other_icon;
        break;

      default:
        break;
    }
    return image;
  };
  const nextMonthStatus = toDate => {
    if (moment(toDate).format(dateFormat_YYYY_MM_DD) > endOfMonth) {
      setNextMonth(toDate);
      return true;
    } else {
      setNextMonth(null);
      return false;
    }
  };
  const disableCheck = deskNameDate => {
    return moment(deskNameDate).isBefore(
      moment(new Date()).format(dateFormat_YYYY_MM_DD),
    );
  };
  const checkingDate = (scheduleDate, deskName) => {
    const date1 = moment(scheduleDate).format('MM');
    const date2 = moment(nextMonth).format('MM');
    if (date1 == date2) {
      if (remoteNextMonthdays < remoteMonth) {
        setRemoteNextMonthdays(prev => prev + 1);
        var sD = JSON.parse(JSON.stringify(scheduleData));
        sD[deskName]['work_place'] = 2;
        setScheduleData({ ...sD });
        setBtnDisable(true);
      }
    } else if (remotedays < remoteMonth) {
      var sD = JSON.parse(JSON.stringify(scheduleData));
      sD[deskName]['work_place'] = 2;
      setRemotedays(pre => pre + 1);
      setScheduleData({ ...sD });
      setBtnDisable(true);
    }
  };
  const styleChanges = (scheduleDate, model, deskName) => {
    const date1 = moment(scheduleDate).format('MM');
    const date2 = moment(nextMonth).format('MM');

    if (date1 == date2) {
      if (remoteNextMonthdays >= remoteMonth) {
        setAllot(true);
        return model;
      }
    } else if (date1 != date2) {
      if (remotedays >= remoteMonth) {
        setAllot(true);
        return model;
      }
    } else {
      return '';
    }
  };
  const changeShedule = (scheduleDate, work_place) => {
    const date1 = moment(scheduleDate).format('MM');
    const date2 = moment(nextMonth).format('MM');
    if (date1 == date2 && work_place == 2) {
      setRemoteNextMonthdays(prev => prev - 1);
    } else if (work_place == 2) {
      setRemotedays(prev => prev - 1);
    }
  };
  const getData = () => {
    const payload = {
      from_date: moment(quickbookFromDate).format(dateFormat_YYYY_MM_DD),
      to_date: moment(quickbookToDate).format(dateFormat_YYYY_MM_DD),
      month_start_date: startOfMonth,
      month_end_date: endOfMonth,
      book_for: bookedFor ? bookedFor : '',
    };
    if (nextMonth || nextMonthStatus(quickbookToDate)) {
      payload['smonth_start_date'] = moment(new Date(quickbookToDate))
        .clone()
        .startOf('month')
        .format(dateFormat_YYYY_MM_DD);
      payload['smonth_end_date'] = moment(new Date(quickbookToDate))
        .clone()
        .endOf('month')
        .format(dateFormat_YYYY_MM_DD);
    }
    const successCallback = (data, res) => {
      setLoading(false);
      if (res.data.code == 200) {
        setRemotedays(parseInt(data?.remotedays_count));
        setRemoteMonth(parseInt(data?.remotedays_monthcount));
        setRemoteNextMonthdays(parseInt(data?.sremotedays_count));
        setScheduleData(data);
        setScheduleDataCopy({ ...data });
      }
    };
    setLoading(true);
    postData(GetWeeklySchedule, payload, successCallback);
  };
  useEffect(() => {
    getData();
  }, [quickbookFromDate, quickbookToDate, bookedFor]);

  return (
    <>
      <div className="schedule-calendar-table table-responsive">
        <table>
          <thead>
            <tr>
              <th className="schedule-empty"></th>
              {assetData?.week?.[0]?.map((item, index) => {
                return (
                  item?.name != QuickbookWeekStatus.other && (
                    <th className="schedule-icons-info" key={index}>
                      <span>
                        <img src={getImg(item?.name)} alt="img" />
                      </span>
                      <p>{item?.name}</p>
                    </th>
                  )
                );
              })}
            </tr>
          </thead>
          <tbody>
            {scheduleData !== null &&
              Object.keys(scheduleData)?.map((deskName, index) => {
                const desk = deskFilter?.includes(deskName);
                const deskNameDate = scheduleData[deskName]['schedule_date'];
                return (
                  !desk && (
                    <tr
                      className={`${disableCheck(deskNameDate) ? 'opacity-50' : ''
                        }`}
                      key={index}
                    >
                      <td>
                        <p>{deskName?.split(' ')[0]}</p>
                        <span className="date-desk">
                          {deskName?.split(' ')[1]}
                        </span>
                      </td>
                      {assetData?.week?.[0]?.map((item, index) => {
                        return (
                          item?.name != QuickbookWeekStatus.other && (
                            <td className="schedule-radio" key={index}>
                              <label className="custom_radio">
                                <input
                                  type="radio"
                                  onChange={() => {
                                    if (disableCheck(deskNameDate)) {
                                    } else {
                                      changeShedule(
                                        scheduleData[deskName]?.schedule_date,
                                        scheduleData[deskName]['work_place'],
                                      );
                                      const sD = JSON.parse(
                                        JSON.stringify(scheduleData),
                                      );
                                      sD[deskName]['work_place'] = parseInt(
                                        item?.id,
                                      );
                                      setScheduleData({ ...sD });
                                    }
                                  }}
                                  checked={
                                    scheduleData[deskName]?.work_place ==
                                      parseInt(item?.id)
                                      ? true
                                      : false
                                  }
                                  disabled={moment(deskName)?.isBefore(
                                    currentDate,
                                  )}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </td>
                          )
                        );
                      })}
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
      </div>
      {allot && (
        <WarningModal
          open={allot}
          onCancel={() => {
            setAllot(false);
          }}
          onConfirm={() => { }}
          title={QuickbookLabels.warning}
          description={QuickbookLabels.maxRemoteDaysWarning}
          cancelBtn={QuickbookLabels.cancel}
        />
      )}
    </>
  );
};
export default QuickBookWeekScheduleTable;
