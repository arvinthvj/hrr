import React, { useState } from 'react';
import { homeRemote, info, out_office } from '../../../imagepath';
import { Collapse, Popover } from 'antd';
const { Panel } = Collapse;
import { Scrollbars } from 'react-custom-scrollbars';
import { carbon_unknown, av1, in_office } from '../../../imagepath';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirst_LastName } from '../../../../assets/globals';

const WhoInOutToday = props => {
  const [summaryLength, setSummaryLength] = useState(6);
  const [panelkeys, setpanelkeys] = useState(['1', '2', '3', '5', '6']);
  const Displaydata = props?.data?.data;

  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart card-event">
          <div className="report-card-map-header">
            <h3>
              Who's in, who's out today
              <Popover content="Header">
                <img src={info} alt="" />
              </Popover>
            </h3>
          </div>
          <div className="card-count-grid">
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">In office</h6>
              <div className="count-cell-info">
                <img src={in_office} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.inoffice?.count || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Remote</h6>
              <div className="count-cell-info">
                <img src={homeRemote} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.remote?.count || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Out of office</h6>
              <div className="count-cell-info">
                <img src={out_office} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.outofOffice?.count || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Unknown</h6>
              <div className="count-cell-info">
                <img src={carbon_unknown} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.unknown?.count || 0}
                </span>
              </div>
            </div>
          </div>
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={0}
            autoHeightMax="560px"
            thumbMinSize={30}
            universal={true}
          >
            <Collapse
              defaultActiveKey={['1', '2', '3', '5', '6']}
              expandIconPosition="right"
              ghost={true}
              onChange={(key: any) => setpanelkeys(key)}
            >
              <Panel header="Working Remotely" key="1">
                {Displaydata?.remote?.user_details?.length > 0 ? (
                  Displaydata?.remote?.user_details?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-avatar me-2">
                        <GetImgaeFromS3Bucket
                          imageFile={obj?.profile_photo}
                          type={'image'}
                          name={findFirst_LastName(
                            obj?.first_name,
                            obj?.last_name,
                          )}
                          style="hr"
                          userDetail={obj}
                        />
                      </div>
                      <div className="card-flex-info">
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">Lead Developer - UK IT</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              {!panelkeys.includes('1') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.remote?.user_details?.length > 0
                                ? Displaydata?.remote?.user_details
                                    ?.slice(0, summaryLength)
                                    ?.map((imgurl, index) => {
                                      return (
                                        <div
                                          className="avatar"
                                          key={index}
                                          //  onClick={() => handledetailPage(imgurl)}
                                        >
                                          {imgurl?.profile_photo == undefined ||
                                          imgurl?.profile_photo == '' ||
                                          imgurl?.profile_photo == ' ' ? (
                                            <p className="avatar-text border">
                                              <span>
                                                {findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                              </span>
                                            </p>
                                          ) : (
                                            <>
                                              <GetImgaeFromS3Bucket
                                                imageFile={
                                                  imgurl?.profile_photo
                                                }
                                                type={'image'}
                                                userDetail={imgurl}
                                                name={findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                                style={'profile'}
                                              />
                                            </>
                                          )}
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                            {Displaydata?.remote?.user_details?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.remote?.user_details?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.remote?.user_details?.length -
                                    summaryLength}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <Panel header="Annual Leave (Holiday)" key="2">
                {Displaydata?.annualLeave?.user_details?.length > 0 ? (
                  Displaydata?.annualLeave?.user_details?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-avatar me-2">
                        <GetImgaeFromS3Bucket
                          imageFile={obj?.profile_photo}
                          type={'image'}
                          name={findFirst_LastName(
                            obj?.first_name,
                            obj?.last_name,
                          )}
                          style="hr"
                          userDetail={obj}
                        />
                      </div>
                      <div className="card-flex-info">
                        <p className="grey mb-0 f14-400">26/06/2023</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">Lead Developer - UK IT</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              {!panelkeys.includes('2') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.annualLeave?.user_details?.length >
                              0
                                ? Displaydata?.annualLeave?.user_details
                                    ?.slice(0, summaryLength)
                                    ?.map((imgurl, index) => {
                                      return (
                                        <div
                                          className="avatar"
                                          key={index}
                                          //  onClick={() => handledetailPage(imgurl)}
                                        >
                                          {imgurl?.profile_photo == undefined ||
                                          imgurl?.profile_photo == '' ||
                                          imgurl?.profile_photo == ' ' ? (
                                            <p className="avatar-text border">
                                              <span>
                                                {findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                              </span>
                                            </p>
                                          ) : (
                                            <>
                                              <GetImgaeFromS3Bucket
                                                imageFile={
                                                  imgurl?.profile_photo
                                                }
                                                type={'image'}
                                                userDetail={imgurl}
                                                name={findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                                style={'profile'}
                                              />
                                            </>
                                          )}
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                            {Displaydata?.annualLeave?.user_details?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.annualLeave?.user_details
                                      ?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.annualLeave?.user_details
                                    ?.length - summaryLength}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <Panel header="Sick Leave" key="3">
                {Displaydata?.sickLeave?.user_details?.length > 0 ? (
                  Displaydata?.sickLeave?.user_details?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-avatar me-2">
                        <GetImgaeFromS3Bucket
                          imageFile={obj?.profile_photo}
                          type={'image'}
                          name={findFirst_LastName(
                            obj?.first_name,
                            obj?.last_name,
                          )}
                          style="hr"
                          userDetail={obj}
                        />
                      </div>
                      <div className="card-flex-info">
                        <p className="grey mb-0 f14-400">26/06/2023</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">Lead Developer - UK IT</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              {!panelkeys.includes('3') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.sickLeave?.user_details?.length > 0
                                ? Displaydata?.sickLeave?.user_details
                                    ?.slice(0, summaryLength)
                                    ?.map((imgurl, index) => {
                                      return (
                                        <div
                                          className="avatar"
                                          key={index}
                                          //  onClick={() => handledetailPage(imgurl)}
                                        >
                                          {imgurl?.profile_photo == undefined ||
                                          imgurl?.profile_photo == '' ||
                                          imgurl?.profile_photo == ' ' ? (
                                            <p className="avatar-text border">
                                              <span>
                                                {findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                              </span>
                                            </p>
                                          ) : (
                                            <>
                                              <GetImgaeFromS3Bucket
                                                imageFile={
                                                  imgurl?.profile_photo
                                                }
                                                type={'image'}
                                                userDetail={imgurl}
                                                name={findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                                style={'profile'}
                                              />
                                            </>
                                          )}
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                            {Displaydata?.sickLeave?.user_details?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.sickLeave?.user_details
                                      ?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.sickLeave?.user_details
                                    ?.length - summaryLength}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <Panel header="Out of office - Other" key="5">
                {Displaydata?.otherLeaves?.user_details?.length > 0 ? (
                  Displaydata?.otherLeaves?.user_details?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-avatar me-2">
                        <GetImgaeFromS3Bucket
                          imageFile={obj?.profile_photo}
                          type={'image'}
                          name={findFirst_LastName(
                            obj?.first_name,
                            obj?.last_name,
                          )}
                          style="hr"
                          userDetail={obj}
                        />
                      </div>
                      <div className="card-flex-info">
                        <p className="grey mb-0 f14-400">26/06/2023</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">Lead Developer - UK IT</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              {!panelkeys.includes('5') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.otherLeaves?.user_details?.length >
                              0
                                ? Displaydata?.otherLeaves?.user_details
                                    ?.slice(0, summaryLength)
                                    ?.map((imgurl, index) => {
                                      return (
                                        <div
                                          className="avatar"
                                          key={index}
                                          //  onClick={() => handledetailPage(imgurl)}
                                        >
                                          {imgurl?.profile_photo == undefined ||
                                          imgurl?.profile_photo == '' ||
                                          imgurl?.profile_photo == ' ' ? (
                                            <p className="avatar-text border">
                                              <span>
                                                {findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                              </span>
                                            </p>
                                          ) : (
                                            <>
                                              <GetImgaeFromS3Bucket
                                                imageFile={
                                                  imgurl?.profile_photo
                                                }
                                                type={'image'}
                                                userDetail={imgurl}
                                                name={findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                                style={'profile'}
                                              />
                                            </>
                                          )}
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                            {Displaydata?.otherLeaves?.user_details?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.otherLeaves?.user_details
                                      ?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.otherLeaves?.user_details
                                    ?.length - summaryLength}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <Panel header="Unkown" key="6">
                {Displaydata?.unknown?.user_details?.length > 0 ? (
                  Displaydata?.unknown?.user_details?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-avatar me-2">
                        <GetImgaeFromS3Bucket
                          imageFile={obj?.profile_photo}
                          type={'image'}
                          name={findFirst_LastName(
                            obj?.first_name,
                            obj?.last_name,
                          )}
                          style="hr"
                          userDetail={obj}
                        />
                      </div>
                      <div className="card-flex-info">
                        <p className="grey mb-0 f14-400">26/06/2023</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">Lead Developer - UK IT</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              {!panelkeys.includes('6') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.unknown?.user_details?.length > 0
                                ? Displaydata?.unknown?.user_details
                                    ?.slice(0, summaryLength)
                                    ?.map((imgurl, index) => {
                                      return (
                                        <div
                                          className="avatar"
                                          key={index}
                                          //  onClick={() => handledetailPage(imgurl)}
                                        >
                                          {imgurl?.profile_photo == undefined ||
                                          imgurl?.profile_photo == '' ||
                                          imgurl?.profile_photo == ' ' ? (
                                            <p className="avatar-text border">
                                              <span>
                                                {findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                              </span>
                                            </p>
                                          ) : (
                                            <>
                                              <GetImgaeFromS3Bucket
                                                imageFile={
                                                  imgurl?.profile_photo
                                                }
                                                type={'image'}
                                                userDetail={imgurl}
                                                name={findFirst_LastName(
                                                  imgurl?.first_name,
                                                  imgurl?.last_name,
                                                )}
                                                style={'profile'}
                                              />
                                            </>
                                          )}
                                        </div>
                                      );
                                    })
                                : null}
                            </>
                            {Displaydata?.unknown?.user_details?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.unknown?.user_details?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.unknown?.user_details?.length -
                                    summaryLength}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </Collapse>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default WhoInOutToday;
