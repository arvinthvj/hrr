import React from 'react';
import { Link } from 'react-router-dom';
import { hrTabArray } from './constants';
import { findLabelText } from '../commonMethod';

const HrTab = ({ setActiveTab, checkIsOpned, setTabName, tabName }) => {
  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="manager-tab-header">
      <div className="manager-tabs">
        <ul className="nav nav-tabs" id="managerTab" role="tablist">
          {hrTabArray?.map((item, index) => {
            return (
              <li className="nav-item" role="presentation" key={index}>
                <Link
                  className={`nav-link ${tabName == item?.tabName ? 'active' : ''
                    }`}
                  id={item?.name[0]}
                  data-bs-toggle="tab"
                  to="#"
                  role="tab"
                  aria-controls={item?.name[1]}
                  aria-selected="true"
                  onClick={() => {
                    setTabName(item?.tabName);
                    handleTabChange(item?.tabName);
                    checkIsOpned(false);
                  }}
                >
                  <img src={item?.image} alt="" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="manager-header">
        <h4>{findLabelText(tabName.replace(/\s+/g, '_'), tabName, 'Hr')}</h4>
      </div>
    </div>
  );
};

export default HrTab;
