import React, { useEffect } from 'react';
import QuickBookTabs from './quickBookTabs';
import { useDispatch, useSelector } from 'react-redux';
import { SetQuickBookSelect } from '../../reduxStore/quickBookSlice';
import { QuickbookSelectIds } from './constant';
type QuickBookProps = {
  activeDashboardFunction: CallableFunction;
};

const QuickBook: React.FC<QuickBookProps> = ({ activeDashboardFunction }) => {
  const dispatch = useDispatch();
  const { quickBookSelect } = useSelector((state: any) => state?.quickBook);
  useEffect(() => {
    !quickBookSelect &&
      dispatch(SetQuickBookSelect(QuickbookSelectIds.workspace));
  }, []);
  return (
    <div>
      <QuickBookTabs activeDashboardFunction={activeDashboardFunction} />
    </div>
  );
};

export default QuickBook;
