import React, { useState } from 'react';
import { ParkingIcon, RoomIcon, WorkspacesIcon } from '../imagepath';
import { LabelText } from './constants';
import { findLabelText } from '../commonMethod';
const DashboardTabList = ({ selectTapCheck, tapList }) => {
  interface BookDetailsProps {
    id: number;
    name: string;
    icon_images: string | null | undefined;
  }
  const [selectTap, setSelectTap] = useState([1, 2, 3, null]);
  const handleSelectTap = value => {
    const check = selectTap.indexOf(value);
    if (check >= 0) {
      selectTap.splice(check, 1);
    } else {
      selectTap.push(value);
    }
    selectTapCheck([...selectTap]);
    setSelectTap([...selectTap]);
  };
  const findImg = items => {
    return items == 'Workspaces'
      ? WorkspacesIcon
      : items == 'Rooms'
      ? RoomIcon
      : ParkingIcon;
  };
  return (
    <div className="work-check-grp work-check-grp-info justify-content-between mb-0">
      <div className="work-check">
        <form action="#">
          {tapList?.map((value: BookDetailsProps, i: number) => {
            return (
              <div className="form-check check-forms-space" key={i}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="check1"
                  name="option1"
                  checked={selectTap.includes(value.id)}
                  onChange={() => handleSelectTap(value.id)}
                />
                <label className="form-check-label">
                  <img
                    src={findImg(value.name)}
                    alt="img"
                    className="me-2"
                    height={28}
                    width={25}
                  />
                  {findLabelText(value.name, value.name, LabelText.dashboard)}
                </label>
              </div>
            );
          })}
        </form>
      </div>
      {/* <button
        style={{ cursor: "not-allowed", opacity: "0.4" }}
        className="link-set link-set-change-schedule"
      >
        {findLabelText(
          LabelText.Change_your_schedule,
          LabelText.ChangeYourSchedule,
          LabelText.dashboard
        )}
      </button> */}
    </div>
  );
};
export default DashboardTabList;
