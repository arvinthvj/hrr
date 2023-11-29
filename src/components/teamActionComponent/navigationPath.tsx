import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTeamHierarchy } from "../../reduxStore/appSlice";
import { Link } from "react-router-dom";
import { findLabelText } from "../commonMethod";

interface NavigationPathProps {
  updateCurrentPage: CallableFunction;
}
export const NavigationPath: React.FC<NavigationPathProps> = ({
  updateCurrentPage,
}) => {
  const { teamHierarchy } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const onClickTeam = (index) => {
    try {
      const list: any = [];
      if (teamHierarchy?.length) {
        for (let i = 0; i < index + 1; i++) {
          list.push(teamHierarchy[i]);
        }
        const preparData = [...list];
        dispatch(setTeamHierarchy(preparData));
        setTimeout(() => {
          updateCurrentPage(preparData);
        }, 500);
      }
    } catch (error) {}
  };

  const onClickAllTeam = () => {
    try {
      const preparData = [];
      dispatch(setTeamHierarchy(preparData));
      setTimeout(() => {
        updateCurrentPage([]);
      }, 500);
    } catch (error) {}
  };

  return (
    <div className="navigationPathView">
      <ul>
        <li
          className={
            teamHierarchy?.length == 0
              ? "breadcrumbs-list active"
              : "breadcrumbs-list"
          }
        >
          <Link
            to="#"
            onClick={() => {
              onClickAllTeam();
            }}
          >
            {findLabelText("All_teams", "All teams", "Settings")}
          </Link>
        </li>
        {teamHierarchy?.length > 0
          ? teamHierarchy?.map((path, index) => {
              return (
                <li
                  className={
                    teamHierarchy?.length - 1 == index
                      ? "breadcrumbs-list active"
                      : "breadcrumbs-list"
                  }
                  key={index}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      onClickTeam(index);
                    }}
                  >
                    {path?.name ? path?.name : ""}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};
