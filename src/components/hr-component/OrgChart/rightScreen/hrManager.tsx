import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../../../imagepath';
import { PersonalContext } from '../../personalController';
import { findLabelText } from '../../../commonMethod';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirstName } from '../../../../assets/globals';
import DropDownOptions from '../../../dropDown/dropdownOptions';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../../../reduxStore/appSlice';
import { postData } from '../../../../services/apicall';
import { updateRootUser } from '../../../../services/apiurl';
import {
  setOrgChatRootNode,
  setUpdateOrgChart,
} from '../../../../reduxStore/hrSlice';
import { DeleteConfirmationModal } from '../../../deleteConfirmationModal/DeleteConfirmationModal';

type HrJobManagerProps = {
  userManagerData: any;
  allUsersList: any;
  setSelectedTab: any;
  setIsSave: any;
  setManager: any;
  redirectUserPersonal: any;
};

const HrJobManager = ({
  setIsSave,
  setManager,
  userManagerData,
  allUsersList,
  redirectUserPersonal,
}: HrJobManagerProps) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<any>(null);
  const { selectedNodes, setSelectedNodes } = useContext(PersonalContext);
  const [users, setUsers] = useState(allUsersList);
  const [managerSearchValue, setManagerSearchValue] = useState('');
  const dispatch = useDispatch();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [managerData, setManagerData] = useState([]);
  const { orgChatRootNode } = useSelector((state: any) => state?.hr);
  const title =
    selectedNodes?.id == orgChatRootNode
      ? 'Replace Head of organization'
      : 'Managers';

  useEffect(() => {
    getFilterData();
  }, [managerSearchValue]);

  useEffect(() => {
    setManagerData(userManagerData);
  }, [userManagerData]);

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (
        dropdownRef?.current?.classList?.contains('input-filter') &&
        !dropdownRef?.current?.contains(e.target) &&
        !selectRef.current.contains(e.target)
      ) {
        setIsDropdown(false);
      }
    });
    return () => {
      window.removeEventListener('click', (e: any) => {
        if (
          dropdownRef?.current?.classList?.contains('input-filter') &&
          !dropdownRef?.current?.contains(e.target) &&
          !selectRef.current.contains(e.target)
        ) {
          setIsDropdown(false);
        }
      });
    };
  }, []);

  const getFilterData = () => {
    const list = [...allUsersList];
    if (managerSearchValue === '') {
      setUsers(allUsersList);
      return;
    }
    const filteredValues = list?.filter(
      item =>
        item.name.toLowerCase().indexOf(managerSearchValue.toLowerCase()) !==
        -1,
    );
    setUsers(filteredValues);
  };

  const updateUserManager = (user: any) => {
    setIsDropdown(false);
    const array = [];
    array.push(user);
    setManager(array);
    setManagerData(array);
    setIsSave(true);
  };

  const handleManagerDelete = () => {
    setManager([]);
    setManagerData([]);
    setIsSave(true);
  };

  const updateRootUsers = () => {
    const newRootNode = newUser['id'];
    const payload = {
      root_user_id: selectedNodes?.id,
      user_id: newRootNode,
    };
    dispatch(showLoader());
    setIsDropdown(false);
    postData(updateRootUser, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setOrgChatRootNode(newRootNode));
        setSelectedNodes(newUser);
        dispatch(setUpdateOrgChart(true));
        setManager([]);
        setManagerData([]);
      }
    });
  };

  const updateUser = (user: any) => {
    if (orgChatRootNode && orgChatRootNode == selectedNodes?.id) {
      setIsConfirmPopUp(true);
      setNewUser(user);
    } else {
      updateUserManager(user);
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="direct_tab"
      role="tabpanel"
      aria-labelledby="direct-tab"
      ref={selectRef}
    >
      <div className="chart-user-inner">
        <div className="direct-profile">
          <div className="direct-img">
            <Link to={'#'} onClick={() => redirectUserPersonal(selectedNodes)}>
              {selectedNodes?.profile_image ? (
                <GetImgaeFromS3Bucket
                  imageFile={selectedNodes?.profile_image}
                  type={'image'}
                  name={findFirstName(selectedNodes?.name)}
                  style="small"
                  userDetail={selectedNodes}
                />
              ) : (
                <p className="user-firstletter user-firstletter-small">
                  {findFirstName(selectedNodes?.name)}
                </p>
              )}
            </Link>
          </div>
          <div className="direct-content">
            <h4>
              <Link to={'#'}>{selectedNodes?.name}</Link>
            </h4>
            <h6>{selectedNodes?.title}</h6>
            <p>{selectedNodes?.country}</p>
          </div>
        </div>
        <div className="direct-accordion">
          <div id="direct-accordion">
            <div className="direct-header" id="heading-1">
              <h5 className="direct-head">
                <a
                  role="button"
                  data-bs-toggle="collapse"
                  href="#collapse-1"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                >
                  {title}
                </a>
              </h5>
            </div>
            <div
              id="collapse-1"
              className="collapse show"
              data-bs-parent="#accordion"
              aria-labelledby="heading-1"
            >
              <div className="direct-body">
                <div className="direct-search">
                  <input
                    type="text"
                    placeholder={findLabelText('Find', 'Find', 'Hr')}
                    className={`input-filter bg-white`}
                    value={managerSearchValue}
                    onChange={e => {
                      const val = e?.target?.value.toLowerCase();
                      setIsDropdown(true);
                      setManagerSearchValue(val);
                    }}
                    ref={dropdownRef}
                  />
                  <div className="direct-icon">
                    <span>
                      <img src={Search} alt="img" />
                    </span>
                  </div>
                  {users && users?.length > 0 && isDropdown && (
                    <DropDownOptions
                      hideAddButton
                      type="any"
                      options={users?.length > 0 ? users : []}
                      onChange={opn => {
                        setManagerSearchValue('');
                        setUsers[allUsersList];
                        updateUser(opn);
                      }}
                    />
                  )}
                </div>
                <div className="direct-profile-details">
                  {managerData?.length > 0 &&
                    managerData.map((_dt: any, index) => {
                      return (
                        <div
                          className="direct-profile-info"
                          id={`profile-${index}`}
                          key={`profile-${index}`}
                        >
                          <div
                            className="direct-profile-text"
                            id={`profile-text-${index}`}
                            key={`profile-text-${index}`}
                          >
                            <Link
                              to={'#'}
                              onClick={() => redirectUserPersonal(_dt)}
                            >
                              {_dt?.profile_photo ? (
                                <GetImgaeFromS3Bucket
                                  imageFile={_dt?.profile_image}
                                  type={'image'}
                                  name={findFirstName(_dt?.name)}
                                  style="small"
                                  userDetail={_dt}
                                />
                              ) : (
                                <p className="user-firstletter user-firstletter-small">
                                  {findFirstName(_dt?.name)}
                                </p>
                              )}
                              <p>{_dt?.name}</p>
                            </Link>
                          </div>
                          <div
                            className="direct-profile-delete"
                            id={`delete-${index}`}
                            key={`delete-${index}`}
                          >
                            <Link
                              to={'#'}
                              className="btn"
                              onClick={handleManagerDelete}
                            >
                              <i className="far fa-trash-can" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isConfirmPopUp && (
        <DeleteConfirmationModal
          cancel={() => {
            setIsConfirmPopUp(false);
          }}
          confirm={() => {
            setIsConfirmPopUp(false);
            updateRootUsers();
          }}
          proceedButton="Continue"
          header="Replace head of organization"
          content="Replacing the head of organization will alter the entire structure of the organization"
        />
      )}
    </div>
  );
};

export default HrJobManager;
