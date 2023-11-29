import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { findLabelText, replaceUnderscoreWithSpace } from '../commonMethod';
import { urlSideBar } from '../../assets/constants/config';
import { setSideBar } from '../../assets/globals';
import { AdminUrls } from './constant';
import { floorDetailsUrl } from '../../assets/constants/pageurl';

interface AdminMenuListProps {
  isSideMenu: string | any;
  toggleSidebar: CallableFunction | any;
  sidemenuDisableOpt: Array<string> | any;
  scrollToTop: CallableFunction | any;
}

const AdminMenuList: React.FC<AdminMenuListProps> = ({
  isSideMenu,
  toggleSidebar,
  sidemenuDisableOpt,
  scrollToTop,
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  const { userDetails } = useSelector((state: any) => state.app);
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    const checkUrl = AdminUrls?.find(i => pathName?.includes(i));
    if (checkUrl != undefined) setActive(true);
    else setActive(false);
  }, [pathName]);
  return (
    <>
      {userDetails?.menuList?.some(i => i.type === 'admin') && (
        <li
          className={`submenu-dropdown company-settings-grid ${
            isActive ? 'active' : ''
          }`}
        >
          <Link
            to="#"
            className={isSideMenu === 'companysettings' ? 'subdrop' : ''}
            onClick={() =>
              toggleSidebar(
                isSideMenu === 'companysettings' ? '' : 'companysettings',
              )
            }
          >
            <span>
              {findLabelText(
                'Company_settings',
                'Company settings',
                'Common_Values',
              )}
            </span>{' '}
            <span className="menu-arrow" />
          </Link>
          <ul
            style={{
              display: isSideMenu === 'companysettings' ? 'block' : 'none',
            }}
          >
            {userDetails?.menuList?.map(
              i =>
                i?.type === 'admin' &&
                i?.name !== 'HR_request' && (
                  <li
                    key={i?.id}
                    className={`${
                      pathName == urlSideBar(i?.name) ||
                      (pathName == floorDetailsUrl &&
                        i?.name == 'Floorplan_management')
                        ? 'active'
                        : ''
                    }
                      ${
                        sidemenuDisableOpt.includes(i?.name)
                          ? 'sidebar-disable-option'
                          : ''
                      }
                      `}
                  >
                    <Link
                      className="companysettings"
                      to={urlSideBar(i?.name)}
                      onClick={() => {
                        setSideBar(i?.name);
                        scrollToTop();
                        // if(pathName == "/hr-module") {
                        //   window.location.reload();
                        // }
                      }}
                    >
                      {findLabelText(
                        i?.name,
                        replaceUnderscoreWithSpace(i?.name),
                        'Common_Values',
                      )}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </li>
      )}
    </>
  );
};

export default AdminMenuList;
