import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { findLabelText } from '../commonMethod';
import { CreateOrEditLocationContext } from '../context/context';
import moment from 'moment';
import { Col, Row } from 'antd';
import { dateFormat_YYYY_MM_DD } from '../../assets/constants/config';

const CreateOrEditLocationHeader = () => {
  const {
    activesatate,
    setActiveState,
    setShowInactivePopup,
    untileDate,
    setUntileDate,
  } = useContext(CreateOrEditLocationContext);
  const handleChange = currentdate => {
    setUntileDate(currentdate);
  };
  return (
    <Row>
      <Col lg={24} className="table-headercheck ">
        <div className="checkbox-set">
          <label className="check inactive-check">
            <span className="me-2">
              {findLabelText('Inactive', 'Inactive', 'Common_Values')}
            </span>
            <div className="toogleclass">
              <label className="switch">
                {activesatate ? (
                  <input
                    type="checkbox"
                    data-bs-toggle={'modal'}
                    data-bs-target={'#confirm-modal'}
                    onChange={() => {
                      if (!activesatate) {
                        setActiveState(true);
                      } else {
                        setShowInactivePopup(true);
                      }
                    }}
                    checked={activesatate}
                  />
                ) : (
                  <input
                    type="checkbox"
                    data-bs-toggle={''}
                    data-bs-target={''}
                    onChange={() => {
                      if (!activesatate) {
                        setActiveState(true);
                      } else {
                        setShowInactivePopup(true);
                      }
                    }}
                    checked={activesatate}
                  />
                )}
                <span className="slider round" />
              </label>
            </div>
            <span className="ms-2">
              {findLabelText('Active', 'Active', 'Location')}
            </span>
          </label>
        </div>
      </Col>
      <label className="effect-text">
        {findLabelText(
          'This_will_effect_all_children_under_this_location',
          'This will effect all children under this location',
          'Common_Values',
        )}
      </label>
      <Col lg={24}>
        <div className="filter-search filter-input location-filter-input">
          {!activesatate ? (
            <>
              <label className="location-inactive-message location-blank-message">
                {'Inactive until (unlimited if left blank)'}
              </label>
              <DatePicker
                selected={untileDate ? untileDate : null}
                value={
                  untileDate
                    ? moment(untileDate).format(dateFormat_YYYY_MM_DD) !==
                      moment(new Date()).format(dateFormat_YYYY_MM_DD)
                      ? moment(untileDate).format('DD MMM YYYY')
                      : 'Today, ' + moment(untileDate).format('DD MMM YYYY')
                    : null
                }
                type="text"
                suffixIcon={null}
                minDate={moment().toDate()}
                className="bg-white datetimepicker"
                onChange={handleChange}
              />
            </>
          ) : null}
        </div>
      </Col>
    </Row>
  );
};

export default CreateOrEditLocationHeader;
