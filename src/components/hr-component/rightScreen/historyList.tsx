import React, { useContext } from 'react';
import { PersonalContext } from '../personalController';
import HrHistory from '../hrHistory';

const HistoryList = () => {
  const { historyList } = useContext(PersonalContext);

  return <HrHistory historyList={historyList} />;
};

export default HistoryList;
