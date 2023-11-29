import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import { PersonalContext } from './personalController';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { findFirstName, findFirst_LastName } from '../../assets/globals';
import { findLabelText } from '../commonMethod';

const PersonCard = () => {
  const { details, informationList, userID, setUserID } =
    useContext(PersonalContext);

  const data = [];
  let managerName;
  let managerId;
  let managerTeam;
  let workStatus;
  let countryCode;
  let companyNumber;
  let Email;
  if (informationList?.length > 0) {
    managerName = informationList.find(
      (item: any) =>
        item?.type == 'Manager' && item?.list_type == 'work_manager',
    )?.name;
    managerId = informationList.find(
      (item: any) =>
        item?.type == 'Manager' && item?.list_type == 'work_manager',
    )?.name_id;
    managerTeam = informationList.find(
      (item: any) =>
        item?.primary == 'Yes' && item?.list_type == 'manager_team',
    )?.team_name;
    informationList.map(item => {
      if (item?.list_type == 'work_direct_reports') {
        data.push({ id: item?.name_id, name: item?.name });
      }
      if (item?.list_type == 'work_basic') {
        workStatus = item?.work_status;
        countryCode = item?.country_code;
        companyNumber = item?.company_phone;
        Email = item?.work_email;
      }
    });
  }

  return (
    <Card className="card manager-card">
      <div className="manager-content">
        <div className="manager-left-info">
          <div className="manager-img-group">
            <div className="manager-view-img">
              {details?.profile_photo ? (
                <Link to="#">
                  <GetImgaeFromS3Bucket
                    imageFile={details?.profile_photo}
                    type={'image'}
                    userDetail={userID}
                    name={
                      details?.first_name && details?.last_name
                        ? findFirst_LastName(
                            details?.first_name,
                            details?.last_name,
                          )
                        : findFirstName(details?.display_name)
                    }
                    style={'hr'}
                  />
                </Link>
              ) : (
                <Link to="#">
                  <span className="user-firstletter">
                    {details?.first_name && details?.last_name
                      ? findFirst_LastName(
                          details?.first_name,
                          details?.last_name,
                        )
                      : findFirstName(details?.display_name)}
                  </span>
                </Link>
              )}
            </div>
            <div className="manager-names">
              <h4>
                <Link to="#">{details?.full_name}</Link>
              </h4>
              <ul className="nav">
                {details?.health_safety?.map((item, index) => {
                  return (
                    <li key={index}>
                      <GetImgaeFromS3Bucket
                        imageFile={item?.health_safety_icons}
                        type={'image'}
                        FilePath={'ghs'}
                      />
                      {item?.name}
                    </li>
                  );
                })}
              </ul>
              <p>{details?.team_name}</p>
            </div>
          </div>
        </div>
        <div className="manager-right-info flex-fill">
          <ul className="nav">
            <li>
              <h6>{findLabelText('Contact', 'Contact', 'Hr')}</h6>
              <p>
                {companyNumber && countryCode} {companyNumber && companyNumber}
              </p>
              <p className="manager-email-text">{Email}</p>
            </li>
            <li>
              <h6>{findLabelText('Status', 'Status', 'Hr')}</h6>
              <p>{workStatus}</p>
            </li>
            <li>
              <h6>{findLabelText('Manager', 'Manager', 'Hr')}</h6>
              <div className="manager-details">
                {managerName && (
                  <>
                    <Link to="#">
                      <span className="user-firstletter">
                        {managerName?.charAt(0)}
                      </span>
                    </Link>
                    <div className="manager-details-info">
                      <Link
                        to="#"
                        onClick={() => {
                          setUserID(managerId);
                        }}
                      >
                        {managerName?.length > 10 ? (
                          <Tooltip title={managerName}>
                            {managerName?.slice(0, 10) + '...'}
                          </Tooltip>
                        ) : (
                          managerName
                        )}
                      </Link>
                      <p>
                        {managerTeam?.length > 10
                          ? managerTeam?.slice(0, 10) + '...'
                          : managerTeam}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </li>
            <li>
              <h6>{findLabelText('Direct_reports', 'Direct reports', 'Hr')}</h6>
              <div className="direct-reports-details">
                {data?.map((item, index) => {
                  if (index < 3) {
                    return (
                      <Link
                        to="#"
                        onClick={() => {
                          setUserID(item?.id);
                        }}
                        key={index}
                      >
                        {item?.name}
                      </Link>
                    );
                  }
                })}
                {data?.length > 3 && (
                  <Link to="#">+ {data?.length - 3} more</Link>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PersonCard;
