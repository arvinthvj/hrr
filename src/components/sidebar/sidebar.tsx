import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { setShowMobileMenu } from '../../reduxStore/appSlice';
import { getImageFroms3Bucket } from '../../services/s3Bucket';
import CompanyLogo from './companyLogo';
import UserMenuList from './userMenuList';
import AdminMenuList from './adminMenuList';
import SuperAdminMenuList from './superAdminMenuList';
import { sidemenuDisableOpt } from './constant';
import { getDataWithToken } from '../../services/apiservice';
import { getBottomLogo } from '../../services/apiurl';
import { HDPlusLogo } from '../../components/imagepath';

export const Sidebartwo = () => {
  const [imageDownUrl, setImageDownUrl] = useState<any>(null);
  const [isSideMenu, setSideMenu] = useState('');
  const { bottomcompanyLogo, showMobileMenu } = useSelector(
    (state: any) => state.app,
  );
  const sideBarRef = useRef<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (bottomcompanyLogo) {
      getImageFroms3Bucket(
        bottomcompanyLogo,
        'image',
        data => {
          setImageDownUrl(data);
        },
        false,
        'ges',
      );
    }
  }, [bottomcompanyLogo]);

  useEffect(() => {
    getDataWithToken(getBottomLogo)?.then(data => {
      getImageFroms3Bucket(
        data,
        'image',
        data => {
          setImageDownUrl(data);
        },
        false,
        'ges',
      );
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    showMobileMenu && dispatch(setShowMobileMenu(false));
  };
  const toggleSidebar = value => {
    setSideMenu(value);
  };

  return (
    <div className="sidebar" id="sidebar" ref={sideBarRef}>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={true}
      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu sidebar-inner-menu">
            <ul>
              <CompanyLogo />
              <UserMenuList
                sidemenuDisableOpt={sidemenuDisableOpt}
                toggleSidebar={toggleSidebar}
                scrollToTop={scrollToTop}
              />
              <AdminMenuList
                isSideMenu={isSideMenu}
                toggleSidebar={toggleSidebar}
                sidemenuDisableOpt={sidemenuDisableOpt}
                scrollToTop={scrollToTop}
              />
              <SuperAdminMenuList
                isSideMenu={isSideMenu}
                toggleSidebar={toggleSidebar}
                scrollToTop={scrollToTop}
              />
            </ul>
            <div className="sidebar-bottom-logo">
              <img src={HDPlusLogo} height={102} width={109} alt="LOGO" />
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};
