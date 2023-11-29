import React from 'react';
import { findLabelText } from '../commonMethod';
import { CFind } from '../findComponent/Find';
import { Col, Row } from 'antd';

const UserManagementHeader = ({
  bulkselect,
  handleBulkControl,
  liststatus,
  handleaddSearchValue,
  setCurrentPage,
  isShowSearch,
  setShowSearch,
}) => {
  return (
    <div className="card-headers">
      <h3 className="card-titles">
        {findLabelText('User_settings', 'User settings', 'Common_Values')}
      </h3>
      <Col lg={12}>
        <Row className=" align-items-center">
          <Col lg={10}>
            {/* <div className="create-locationsets p-0">
            <div className="table-headercheck select-bulk-section mw-100 m-0">
              <div className="checkbox-set">
                <label className="check user-check text-end m-0">
                  {findLabelText(
                    "Bulk_select",
                    "Bulk select","User_Management"
                  )}
                  <input
                    type="checkbox"
                    checked={bulkselect}
                    onChange={() => handleBulkControl()}
                  />
                  <span className="checkmark user-checkmark" />
                </label>
              </div>
            </div>
          </div> */}
          </Col>
          <Col lg={2} />
          <Col lg={12}>
            <CFind
              name="Users"
              type="any"
              status={liststatus}
              handleChange={val => {
                handleaddSearchValue(val);
                setCurrentPage(1);
              }}
              isShowSearch={isShowSearch}
              setShowSearch={setShowSearch}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default UserManagementHeader;
