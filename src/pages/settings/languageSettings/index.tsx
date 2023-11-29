import React, { useEffect, useState } from 'react';
import SettingsHeaderTabs from '../../../components/settings/settingsHeaderTabs';
import { findLabelText } from '../../../components/commonMethod';
import LanguageList from '../../../components/settings/language/languageList';
import {
  Descriptions,
  Languages,
  SelectStatus,
  TabNames,
} from '../../../components/settings/constant';
import { Col, Layout, Row } from 'antd';
import { postData } from '../../../services/apicall';
import {
  EditProfile,
  LanguageSetting,
  getProfileDatas,
} from '../../../services/apiurl';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../../reduxStore/appSlice';
import { setLanguages } from '../../../reduxStore/languageSettingSlice';
import Toaster from '../../../components/toast';
import { useDispatch, useSelector } from 'react-redux';
const { Content } = Layout;

const LanguageSettings = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: any) => state.app);
  const [languageList, setLanguageList] = useState([]);

  const updateLanguageSetting = value => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      if (res.data.code == 200) {
        // Toaster(res.data.code, res.data.message);
        dispatch(setLanguages(data));
        dispatch(hideLoader());
      }
    };
    const lang = getLang(value);
    postData(LanguageSetting + lang, '', SuccessCallback);
  };

  const getLang = value => {
    let langCode: string | undefined = '';
    if (value?.label) {
      langCode = Languages?.find(i => i?.label == value?.label)?.code;
    } else {
      langCode = 'en';
    }
    return langCode;
  };

  const updateProfile = value => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      dispatch(hideLoader());
      if (res.data.code == 200) {
        getLanguageList();
      }
    };
    const updateData = {
      language_id: value.id,
    };
    postData(EditProfile, updateData, SuccessCallback);
  };

  const getLanguageList = () => {
    dispatch(showLoader());
    const SuccessCallback = (data, res) => {
      dispatch(hideLoader());
      if (res.data.code == 200) {
        const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
        userDetailCopy.language_id = data?.language_id;
        userDetailCopy.language = data?.languages?.filter(
          i => i.selected === SelectStatus.SELECTED,
        );
        dispatch(setUserDetails(userDetailCopy));
        setLanguageList(data?.languages);
        updateLanguageSetting(
          data?.languages?.filter(i => i.selected === SelectStatus.SELECTED)[0],
        );
      }
    };
    postData(getProfileDatas, '', SuccessCallback);
  };

  useEffect(() => {
    getLanguageList();
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <div className="page-wrapper">
          <Content className="content">
            <Row>
              <SettingsHeaderTabs activeTab={TabNames.language} />
              <Col span={24} className="main-space-remove">
                <div className="setting-profile-group setting-profile-group-info card">
                  <div className="setting-profile-head">
                    <h3>
                      {' '}
                      {findLabelText(
                        TabNames.language,
                        TabNames.language,
                        TabNames.settings,
                      )}
                    </h3>
                    <p>
                      {findLabelText(
                        'This_will_impact_both_the_mobile_and_desktop_apps_As_well_as_all_notifications',
                        Descriptions.languageDesc,
                        'Common_Values',
                      )}
                    </p>
                  </div>
                  <LanguageList
                    updateProfile={updateProfile}
                    languageList={languageList}
                  />
                </div>
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
};

export default LanguageSettings;
