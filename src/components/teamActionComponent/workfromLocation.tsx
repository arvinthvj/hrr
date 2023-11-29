import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { Link } from 'react-router-dom';
import { TimeRightIcon, TimeleftIcon, icon_01, locatIcon } from '../imagepath';
import { GetImgaeFromS3Bucket } from '../../services/s3Bucket';
import { FloorProfileImgItemProps } from '../../assets/globals/typeConstants';
import { findFirstName } from '../../assets/globals';
import { TeamManagerLabelText } from '../teamSettingComponent/constants';
import { findLabelText, getPrefereredTimeToDisplay } from '../commonMethod';
import { userviewlocateUrl } from '../../assets/constants/pageurl';
const WorkFromLocation = ({
  buildings,
  responceSummary,
  setViewData,
  setPageChange,
  pageChange,
  setSearchUser,
}) => {
  const { languages } = useSelector((state: RootReduxProps) => state?.language);
  const handledetailPage = (value: FloorProfileImgItemProps, type = '') => {
    if (type !== '') {
      setViewData({ type: 'viemManager', values: value });
      setSearchUser('');
    } else {
      setViewData({ type: 'user', values: value });
    }
    setPageChange(!pageChange);
  };

  const getBuildingId = val => {
    const data = responceSummary
      ? responceSummary?.user_details?.floors?.[val]
      : {};
    const getId = data
      ? Object.keys(data).map(floor => {
          return data[floor][0]?.floor_id ? data[floor][0]?.floor_id : '';
        })[0]
      : null;
    return getId;
  };

  return (
    <div className="work-team-group">
      {Object.keys(buildings)?.length == 0 && (
        <>
          <div className="team-work-head d-flex align-items-center">
            <div className="office-address-list">
              <h3>
                {' '}
                {languages?.Dashboard
                  ? languages?.Dashboard?.Working_from?.name
                  : 'Working from'}{' '}
                {responceSummary?.location_details?.building_name}
              </h3>
              <p>{responceSummary?.location_details?.street_name}</p>
            </div>
            <Link to="#">
              <img src={locatIcon} alt="icon" />
            </Link>
          </div>
        </>
      )}
      {Object.keys(buildings)?.length > 0 ? (
        Object.keys(buildings)?.map((val, index) => {
          return (
            <Fragment key={index}>
              <div className="team-work-head d-flex align-items-center">
                <div className="office-address-list">
                  <h3>
                    {' '}
                    {languages?.Dashboard
                      ? languages?.Dashboard?.Working_from?.name
                      : 'Working from'}{' '}
                    {val}
                  </h3>
                  <p>{}</p>
                </div>
                <Link
                  to={userviewlocateUrl}
                  state={{
                    floorId: getBuildingId(val) ? getBuildingId(val) : '',
                  }}
                >
                  <img src={locatIcon} alt="icon" />
                </Link>
              </div>
              <div className="table-responsive out-table-responsive">
                {buildings[val]?.length > 0 ? (
                  <table className="table table-striped work-space mb-0">
                    <thead>
                      <tr>
                        <th>
                          {findLabelText(
                            TeamManagerLabelText.Name,
                            TeamManagerLabelText.Name,
                            TeamManagerLabelText.Team,
                          )}
                        </th>
                        <th>
                          {findLabelText(
                            TeamManagerLabelText.Status,
                            TeamManagerLabelText.Status,
                            TeamManagerLabelText.Team,
                          )}
                        </th>
                        <th>
                          {findLabelText(
                            TeamManagerLabelText.Workspace,
                            TeamManagerLabelText.Workspace,
                            TeamManagerLabelText.Team,
                          )}
                          (
                          {findLabelText(
                            'if_applicable',
                            'if applicable',
                            'Team',
                          )}
                          )
                        </th>
                        <th>
                          {findLabelText(
                            TeamManagerLabelText.check_in,
                            TeamManagerLabelText.checkIn,
                            TeamManagerLabelText.Team,
                          )}
                          /
                          {findLabelText(
                            TeamManagerLabelText.Check_out,
                            TeamManagerLabelText.Checkout,
                            TeamManagerLabelText.Team,
                          )}
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {buildings[val]?.length > 0 &&
                        buildings[val]?.map((record, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <div className="table-avatar user-profile">
                                  <div className="work-name-img work-name-img-big">
                                    <div
                                      className={`${
                                        record?.status == 'Checked in'
                                          ? 'active-profile'
                                          : 'unactive-profile'
                                      }`}
                                    >
                                      <span />
                                    </div>
                                    <Link
                                      to="#"
                                      onClick={
                                        () => handledetailPage(record)
                                        // record?.user_id
                                      }
                                    >
                                      {record.profile_photo == undefined ||
                                      record.profile_photo == '' ||
                                      record.profile_photo == ' ' ? (
                                        <p>
                                          <span>
                                            {findFirstName(
                                              record?.display_name,
                                            )}
                                          </span>
                                        </p>
                                      ) : (
                                        <>
                                          <GetImgaeFromS3Bucket
                                            imageFile={record?.profile_photo}
                                            type={'image'}
                                            userDetail={record}
                                            name={findFirstName(
                                              record?.display_name,
                                            )}
                                          />
                                        </>
                                      )}
                                    </Link>
                                  </div>
                                  <div>
                                    <h5>
                                      <Link
                                        to="#"
                                        onClick={() => handledetailPage(record)}
                                      >
                                        {record?.full_name}
                                      </Link>
                                    </h5>
                                  </div>
                                  <div className="names-icons">
                                    {record?.health_safety.length > 0
                                      ? record?.health_safety.map(
                                          (icon, index) => {
                                            return (
                                              <Link to="#" key={index}>
                                                <GetImgaeFromS3Bucket
                                                  imageFile={
                                                    icon.health_safety_icons
                                                  }
                                                  type={'image'}
                                                  FilePath={'ghs'}
                                                />
                                              </Link>
                                            );
                                          },
                                        )
                                      : null}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div
                                  className={`${
                                    record.status == 'Checked in'
                                      ? 'check-in-active'
                                      : 'check-in-unactive'
                                  }`}
                                >
                                  <span
                                    style={{
                                      background: record.color_code,
                                      borderColor: record.color_code,
                                    }}
                                  />
                                  <h5>{record?.status}</h5>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center desk-point">
                                  {record?.workspace}
                                  {record?.workspace && (
                                    <Link
                                      to={userviewlocateUrl}
                                      state={{
                                        floorId: record?.floor_id,
                                      }}
                                    >
                                      <img
                                        src={locatIcon}
                                        alt="icon"
                                        className="ms-1"
                                      />
                                    </Link>
                                  )}
                                </div>
                              </td>
                              <td>
                                {record?.status != 'Unknown' ? (
                                  <div className="d-flex desk-point">
                                    {record?.status == 'Checked in' && (
                                      <>
                                        <img
                                          src={TimeleftIcon}
                                          alt="icon"
                                          className="me-2"
                                        />
                                        {getPrefereredTimeToDisplay(
                                          record?.checkin,
                                        )}{' '}
                                      </>
                                    )}
                                    {record?.status == 'Check out' && (
                                      <>
                                        <img
                                          src={TimeleftIcon}
                                          alt="icon"
                                          className="me-2"
                                        />
                                        {getPrefereredTimeToDisplay(
                                          record?.checkin,
                                        )}{' '}
                                        <img
                                          src={TimeRightIcon}
                                          alt="icon"
                                          className="ms-2 me-2"
                                        />
                                        {getPrefereredTimeToDisplay(
                                          record?.checkout,
                                        )}
                                      </>
                                    )}
                                  </div>
                                ) : null}
                              </td>
                              <td className="text-end view-table-profile">
                                <Link
                                  to="#"
                                  onClick={() => handledetailPage(record)}
                                >
                                  <img
                                    src={icon_01}
                                    alt="icon"
                                    className="me-1"
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-records">
                    {findLabelText(
                      TeamManagerLabelText.No_records,
                      TeamManagerLabelText.NoRecords,
                      TeamManagerLabelText.Common_Values,
                    )}
                  </div>
                )}
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="no-records">
          {findLabelText(
            TeamManagerLabelText.No_records,
            TeamManagerLabelText.NoRecords,
            TeamManagerLabelText.Common_Values,
          )}
        </div>
      )}
    </div>
  );
};
export default WorkFromLocation;
