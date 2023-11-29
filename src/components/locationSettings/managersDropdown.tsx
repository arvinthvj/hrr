import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findLabelText } from '../commonMethod';
import { dropdownAngle, plus2 } from '../imagepath';
import { CreateOrEditLocationContext } from '../context/context';
import { postData } from '../../services/apicall';
import { LocationSearchManagers } from '../../services/apiurl';
import DropDownOptions from '../dropDown/dropdownOptions';
import Loader from '../loader';
import { firstLetterStyle } from '../../assets/constants/config';
import { findFirstName } from '../../assets/globals';
import { ValidationMessages } from './constant';
import { Col } from 'antd';

const ManagersDropdown = () => {
  const { selectedmemberList, setSelectedMemberhList } = useContext(
    CreateOrEditLocationContext,
  );
  const [managerCollapse, setManagerCollapse] = useState(true);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberSearchList, setMemberSearchList] = useState([]);
  const [memberLoading, setMemberLoading] = useState(false);
  const changeMenderSearchText = event => {
    setMemberSearch(event.target.value);
  };
  const getManagementList = () => {
    setMemberLoading(true);
    postData(LocationSearchManagers, { name: memberSearch }, successRes => {
      setMemberLoading(false);
      if (successRes?.List?.length > 0) {
        const list: any = [];
        for (const obj of successRes.List) {
          obj['user_id'] = obj.id;
          list.push(obj);
        }
        setMemberSearchList(list);
      } else {
        setMemberSearchList([]);
      }
    });
  };
  useEffect(() => {
    memberSearch && getManagementList();
  }, [memberSearch]);

  return (
    <Col lg={24} className="locate-manage mt-3">
      <div className="locate-managehead locate-managehead-inner">
        <Link
          data-bs-toggle="collapse"
          to="#manager"
          role="button"
          aria-expanded={managerCollapse ? 'false' : 'true'}
          aria-controls="manager"
          onClick={() => setManagerCollapse(!managerCollapse)}
        >
          {findLabelText('Managers', 'Managers', 'Dropdown_components')}
          &nbsp; ({selectedmemberList?.length}){' '}
          <img
            src={dropdownAngle}
            alt="img"
            className={
              managerCollapse ? 'collapse-rotate' : 'collapse-norotate'
            }
          />
        </Link>
      </div>
      <div
        className="collapse show"
        id="manager"
        style={{ display: managerCollapse ? 'block' : 'none' }}
      >
        <div className="locate-managecontent border-0">
          <div className="filter-search filter-input mb-0 location-filter-input">
            <input
              type="text"
              placeholder={findLabelText('Find', 'Find', 'Location')}
              className="input-filter bg-white input-filter-locations"
              onChange={changeMenderSearchText}
              value={memberSearch}
            />
            <div className="img-group admin-adds locations-img-group locations-img-group-info">
              <Link to="#">
                <img src={plus2} alt="img" />
              </Link>
            </div>
          </div>
        </div>
        {memberSearch && memberSearchList?.length > 0 ? (
          <DropDownOptions
            type="member"
            options={memberSearchList}
            onChange={opt => {
              const checkData = selectedmemberList?.find(
                val => val.name == opt.name,
              );
              if (checkData == undefined) {
                const newList = selectedmemberList;
                newList.push(opt);
                setSelectedMemberhList(newList);
                setMemberSearch('');
                setMemberSearchList([]);
              }
            }}
          />
        ) : memberLoading ? (
          <Loader height={'30'} width={'30'} />
        ) : memberSearch ? (
          <p style={{ color: 'red', marginLeft: '15px' }}>
            {ValidationMessages.noMatchFound}
          </p>
        ) : null}

        {selectedmemberList?.length > 0
          ? selectedmemberList?.map((member, index) => {
              return (
                <div key={index} className="locate-managename">
                  <div className="name-groups">
                    <div className="work-name-img work-name-img-small">
                      <Link to="#">
                        {member.profile_photo == undefined ||
                        member.profile_photo == '' ? (
                          <p
                            className="user-firstletter user-firstletter-small"
                            style={firstLetterStyle}
                          >
                            {findFirstName(member.name)}
                          </p>
                        ) : (
                          <img
                            src={`${member.base_url}${member.profile_photo}`}
                            alt="icon"
                          />
                        )}
                      </Link>
                    </div>
                    <h5>
                      <Link to="#">{member.name}</Link>
                    </h5>
                  </div>
                  {member?.isdelete != 1 ? (
                    <div className="remove-links">
                      <Link
                        to="#"
                        onClick={() => {
                          const removeList = selectedmemberList;
                          removeList.splice(index, 1);
                          setSelectedMemberhList(removeList);
                          setMemberSearch('');
                          setMemberSearchList([]);
                        }}
                        className="remove-link"
                      >
                        {findLabelText('Remove', 'Remove', 'Location')}
                      </Link>
                    </div>
                  ) : (
                    member?.parent_name
                  )}
                </div>
              );
            })
          : null}
      </div>
    </Col>
  );
};

export default ManagersDropdown;
