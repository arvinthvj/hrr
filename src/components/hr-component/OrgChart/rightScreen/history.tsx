import React, { useContext } from 'react';
import { PersonalContext } from '../../personalController';
import HrHistory from '../../hrHistory';

interface HistoryList {
  historyData?: Array<any>;
}

const HistoryList = ({ historyData }: HistoryList) => {
  const { historyList } = useContext(PersonalContext);
  let history =
    historyData && historyData?.length > 0 ? historyData : historyList;

  return <HrHistory historyList={history} />;
};

export default HistoryList;
