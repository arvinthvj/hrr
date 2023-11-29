import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../../../imagepath';
import { findLabelText } from '../../../commonMethod';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirstName } from '../../../../assets/globals';
import DropDownOptions from '../../../dropDown/dropdownOptions';
type HrJobReporterProps = {
  userReporterData: any;
  setIsSave: any;
  allUsersList: any;
  setUserReports: any;
  redirectUserPersonal: any;
};

const HrJobReporter = ({
  redirectUserPersonal,
  setUserReports,
  userReporterData,
  allUsersList,
  setIsSave,
}: HrJobReporterProps) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState(allUsersList);
  const [reportSearchValue, setReportSearchValue] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);
  const [userReport, setUserReport] = useState(userReporterData);
  const selectRef = useRef<any>(null);

  useEffect(() => {
    setUserReport(userReporterData);
  }, [userReporterData]);

  useEffect(() => {
    getFilterData();
  }, [reportSearchValue]);

  const getFilterData = () => {
    const list = [...allUsersList];
    if (reportSearchValue === '') {
      setUsers(allUsersList);
      return;
    }
    const filteredValues = list?.filter(
      item =>
        item.name.toLowerCase().indexOf(reportSearchValue.toLowerCase()) !== -1,
    );
    setUsers(filteredValues);
  };

  const updateUserReports = (user: any) => {
    setIsDropdown(false);
    const reports: any = [...userReporterData];
    reports.push(user);
    setUserReports(reports);
    setUserReport(reports);
    setIsSave(true);
  };

  const handleDeleteReportees = (data: any) => {
    const reports: any = [...userReporterData];
    const finalReportees = reports?.filter(element => element?.id !== data?.id);
    setUserReports(finalReportees);
    setUserReport(finalReportees);
    setIsSave(true);
  };

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

  return (
    <div
      className="tab-pane fade show active"
      id="direct_tab"
      role="tabpanel"
      aria-labelledby="direct-tab"
      ref={selectRef}
    >
      <div className="chart-repoter">
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
                  {findLabelText('Direct reports', 'Direct reports', 'Hr')}
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
                <div
                  className={`direct-search`} 
                >
                  <input
                    type="text"
                    placeholder={findLabelText('Find', 'Find', 'Hr')}
                    className={`input-filter bg-white`}
                    value={reportSearchValue}
                    onChange={e => {
                      const val = e?.target?.value.toLowerCase();
                      setReportSearchValue(val);
                      setIsDropdown(true);
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
                        setReportSearchValue('');
                        setUsers[allUsersList];
                        updateUserReports(opn);
                      }}
                    />
                  )}
                </div>
                <div className="direct-profile-details">
                  {userReport?.length > 0 &&
                    userReport.map((_dt: any, index) => {
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
                              onClick={() => handleDeleteReportees(_dt)}
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
    </div>
  );
};

export default HrJobReporter;
