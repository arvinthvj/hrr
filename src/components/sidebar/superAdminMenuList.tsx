import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { findLabelText, replaceUnderscoreWithSpace } from '../commonMethod';
import { urlSideBar } from '../../assets/constants/config';
import { setSideBar } from '../../assets/globals';
import { SupeAdminUrls } from './constant';

interface SuperAdminMenuListProps {
  isSideMenu: string | any;
  toggleSidebar: CallableFunction | any;
  scrollToTop: CallableFunction | any;
}

const SuperAdminMenuList: React.FC<SuperAdminMenuListProps> = ({
  isSideMenu,
  toggleSidebar,
  scrollToTop,
}) => {
  const [isActive, setActive] = useState<boolean>(false);
  const { userDetails } = useSelector((state: any) => state.app);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    const checkUrl = SupeAdminUrls?.find(i => pathName?.includes(i));
    if (checkUrl != undefined) setActive(true);
    else setActive(false);
  }, [pathName]);
  return (
    <li className={`submenu-dropdown ${isActive ? 'active' : ''}`}>
      {userDetails?.menuList?.some(i => i.type === 'super_admin') && (
        <Link
          to="#"
          className={isSideMenu === 'tenantadmin' ? 'subdrop' : ''}
          onClick={() =>
            toggleSidebar(isSideMenu === 'tenantadmin' ? '' : 'tenantadmin')
          }
        >
          <span>
            {findLabelText(
              'tenant_admin_portal',
              'Tenant Admin Portal',
              'Common_Values',
            )}
          </span>{' '}
          <span className="menu-arrow" />
        </Link>
      )}
      <ul
        style={{
          display: isSideMenu === 'tenantadmin' ? 'block' : 'none',
        }}
      >
        {userDetails?.menuList?.map(
          i =>
            i?.type == 'super_admin' &&
            i?.name != 'global_asset_types' &&
            i?.name != 'global_hs_roles' && (
              <li
                key={i?.id}
                className={`${pathName == urlSideBar(i?.name) ? 'active' : ''}`}
              >
                <Link
                  to={urlSideBar(i?.name)}
                  onClick={() => {
                    setSideBar(i?.name), scrollToTop();
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
  );
};

export default SuperAdminMenuList;
