import React from 'react';
import { Col, Row } from 'antd';

const LanguageList = ({ updateProfile, languageList }) => {
  const handleChangeLanguage = value => {
    updateProfile(value);
  };
  return (
    <div className="organisation-settings">
      <Row>
        <Col span={8}>
          <div className="organisation-list ">
            <ul>
              {languageList?.map((value: any, index) => {
                return (
                  <li key={index}>
                    {value?.label}
                    <div className="schedule-calendar">
                      <label className="custom_radio">
                        <input
                          type="radio"
                          name="language"
                          defaultValue="option1"
                          checked={value?.selected == 0 ? false : true}
                          onChange={() => handleChangeLanguage(value)}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LanguageList;
