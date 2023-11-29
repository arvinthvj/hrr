import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationPaths } from '../../reduxStore/appSlice';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';

interface NavigationPathProps {
  updateCurrentPage: CallableFunction;
  onClickEdit: CallableFunction;
  showEdit?: boolean;
  hideButton?: boolean | any;
}
export const NavigationPath: React.FC<NavigationPathProps> = ({
  updateCurrentPage,
  onClickEdit,
  showEdit,
  hideButton,
}) => {
  const { locationPaths } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const onClickLocation = index => {
    try {
      const list: any = [];
      if (locationPaths.length) {
        for (let i = 0; i < index + 1; i++) {
          list.push(locationPaths[i]);
        }
        const preparData = [...list];
        dispatch(setLocationPaths(preparData));
        setTimeout(() => {
          updateCurrentPage(preparData);
        }, 500);
      }
    } catch (error) {}
  };

  const onClickGlobalLocation = () => {
    try {
      const preparData = [];
      dispatch(setLocationPaths(preparData));
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
            locationPaths.length == 0
              ? 'breadcrumbs-list active'
              : 'breadcrumbs-list'
          }
        >
          <Link
            to="#"
            onClick={() => {
              onClickGlobalLocation();
            }}
          >
            {findLabelText('Organisation', 'Organisation', 'Settings')}
          </Link>
        </li>
        {locationPaths?.length > 0
          ? locationPaths?.map((path, index) => {
              return (
                <li
                  className={
                    locationPaths.length - 1 == index
                      ? 'breadcrumbs-list active'
                      : 'breadcrumbs-list'
                  }
                  key={index}
                >
                  <Link
                    to="#"
                    onClick={() => {
                      onClickLocation(index);
                    }}
                  >
                    {path?.name ? path?.name : ''}
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
      {showEdit && hideButton && (
        <Link
          to="#"
          className="btn btn-edit btn-edit-info openedit"
          onClick={() => {
            onClickEdit();
          }}
        >
          {findLabelText('Edit', 'Edit', 'Location')}
        </Link>
      )}
    </div>
  );
};
