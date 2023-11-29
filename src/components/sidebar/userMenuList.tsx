import React from 'react';
import { useSelector } from 'react-redux';
import { urlSideBar } from '../../assets/constants/config';
import { Link, useLocation } from 'react-router-dom';
import { setSideBar } from '../../assets/globals';
import { findLabelText } from '../commonMethod';
import {
  BookIcon,
  DashboardIcon,
  HRIcon,
  LocateIcon,
  TeamIcon,
  menu_07,
  menu_08,
  menu_09,
} from '../imagepath';
import { UserMenu } from './constant';

interface UserMenuListProps {
  sidemenuDisableOpt: Array<string> | any;
  toggleSidebar: CallableFunction | any;
  scrollToTop: CallableFunction | any;
}

const UserMenuList: React.FC<UserMenuListProps> = ({
  sidemenuDisableOpt,
  toggleSidebar,
  scrollToTop,
}) => {
  const { userDetails } = useSelector((state: any) => state.app);
  const location = useLocation();
  const pathName = location.pathname;

  const SideBarIcon = name => {
    switch (name) {
      case UserMenu.dashboard:
        return DashboardIcon;
      case UserMenu.locate:
        return LocateIcon;
      case UserMenu.book:
        return BookIcon;
      case UserMenu.plan:
        return menu_09;
      case UserMenu.team:
        return TeamIcon;
      case UserMenu.wellbeing:
        return menu_07;
      case UserMenu.reports:
        return menu_08;
      case UserMenu.analytics:
        return menu_08;
      case UserMenu.hr:
        return HRIcon;
      default:
        return '';
    }
  };

  return (
    <>
      {userDetails?.menuList?.map(
        i =>
          i?.type === 'user' &&
          i?.name !== 'HR_request' && (
            <li
              key={i?.id}
              className={`${pathName == urlSideBar(i?.name) ? 'active' : ''}
                      ${
                        sidemenuDisableOpt?.includes(i?.name)
                          ? 'sidebar-disable-option'
                          : ''
                      }`}
            >
              <Link
                className="addminsettings"
                to={urlSideBar(i?.name)}
                onClick={() => {
                  toggleSidebar(false);
                  setSideBar(i?.name), scrollToTop();
                  // if(pathName == "/hr-module") {
                  //   window.location.reload();
                  // }
                }}
              >
                <img src={SideBarIcon(i?.name)} alt="icon" />{' '}
                <span>{findLabelText(i?.name, i?.name, 'Common_Values')}</span>
              </Link>
            </li>
          ),
      )}
    </>
  );
};

export default UserMenuList;
