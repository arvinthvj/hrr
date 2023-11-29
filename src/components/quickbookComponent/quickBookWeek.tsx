import React, { useState } from 'react';
import QuickBookWeekRangePicker from './quickBookWeekRangePicker';
import QuickBookWeekScheduleTable from './quickBookWeekTable';
import QuickBookWeekFooter from './quickBookWeekFooter';

const QuickBookWeek = () => {
  const [btnDisable, setBtnDisable] = useState(false);
  const [bookedFor, updateBookedFor] = useState(''); // Behalf of =
  const [loading, setLoading] = useState(false);
  const [conformData, setConformData] = useState([]);

  return (
    <div
      className="tab-pane fade show active"
      id="week"
      role="tabpanel"
      aria-labelledby="quick-book-week"
    >
      <QuickBookWeekRangePicker />
      <QuickBookWeekScheduleTable
        setBtnDisable={setBtnDisable}
        bookedFor={bookedFor}
        setLoading={setLoading}
        setConformData={setConformData}
      />
      <QuickBookWeekFooter
        btnDisable={btnDisable}
        updateBookedFor={updateBookedFor}
        loading={loading}
        bookedFor={bookedFor}
        conformData={conformData}
      />
    </div>
  );
};

export default QuickBookWeek;
