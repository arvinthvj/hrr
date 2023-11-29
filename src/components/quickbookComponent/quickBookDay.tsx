import React from 'react';
import QuickBookDropdown from './quickBookDropdown';

import QuickBookDaydetails from './quickBookDaydetails';

const QuickBookDay = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="day"
      role="tabpanel"
      aria-labelledby="quick-book-day"
    >
      <QuickBookDropdown />
      <QuickBookDaydetails />
    </div>
  );
};

export default QuickBookDay;
