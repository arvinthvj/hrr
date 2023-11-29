import React, { useEffect, useState } from 'react';
import { info } from '../../../imagepath';
import { Popover } from 'antd';
import { Collapse, Avatar } from 'antd';
const { Panel } = Collapse;
import { Scrollbars } from 'react-custom-scrollbars';
import { newJoiners, leavers, withoutpayrise } from '../../../imagepath';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirst_LastName } from '../../../../assets/globals';

const PeopleNotes = props => {
  const [summaryLength, setSummaryLength] = useState(6);
  const [panelkeys, setpanelkeys] = useState(['1', '2', '3']);
  const Displaydata = props?.data?.data;

  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart card-event">
          <div className="report-card-map-header">
            <h3>
              <b> People Notes</b>
              <Popover content="Header">
                <img src={info} alt="" />
              </Popover>
            </h3>
          </div>
          <div className="card-count-grid">
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">New Joiners</h6>
              <div className="count-cell-info">
                <img src={newJoiners} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.peopleNotes?.newJoiner?.length || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Leavers</h6>
              <div className="count-cell-info">
                <img src={leavers} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.peopleNotes?.leavers?.length || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Without pay rise</h6>
              <div className="count-cell-info">
                <img src={withoutpayrise} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.peopleNotes?.withoutPayRise?.length || 0}
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
              defaultActiveKey={['1', '2', '3']}
              expandIconPosition="right"
              ghost={true}
              onChange={(key: any) => setpanelkeys(key)}
            >
              <Panel header="New Joiners (last 7 days)" key="1">
                {Displaydata?.peopleNotes?.newJoiner?.length > 0 ? (
                  Displaydata?.peopleNotes?.newJoiner?.map(obj => (
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
                        <p className="grey mb-0 f14-400">{obj?.date}</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">{`${obj?.role} - ${obj?.department}`}</p>
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
                              {Displaydata?.peopleNotes?.newJoiner?.length > 0
                                ? Displaydata?.peopleNotes?.newJoiner
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
                            {Displaydata?.peopleNotes?.newJoiner?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.peopleNotes?.newJoiner?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.peopleNotes?.newJoiner?.length -
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

              <Panel header="Leavers (over next 7 days)" key="2">
                {Displaydata?.peopleNotes?.leavers?.length > 0 ? (
                  Displaydata?.peopleNotes?.leavers?.map(obj => (
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
                        <p className="grey mb-0 f14-400">{obj?.date}</p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
                        <p className="grey f14-400">{`${obj?.role} - ${obj?.department}`}</p>
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
                              {Displaydata?.peopleNotes?.leavers?.length > 0
                                ? Displaydata?.peopleNotes?.leavers
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
                            {Displaydata?.peopleNotes?.leavers?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.peopleNotes?.leavers?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.peopleNotes?.leavers?.length -
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

              <Panel header="Without pay rise for 12 months" key="3">
                {Displaydata?.peopleNotes?.withoutPayRise?.length > 0 ? (
                  Displaydata?.peopleNotes?.withoutPayRise?.map(obj => (
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
                        <p className="grey mb-0 f14-400">
                          Last raise - {obj?.date}
                        </p>
                        <h5 className="hotdeskblue">{`${obj?.first_name} ${obj?.last_name}`}</h5>
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
                              {Displaydata?.peopleNotes?.withoutPayRise
                                ?.length > 0
                                ? Displaydata?.peopleNotes?.withoutPayRise
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
                            {Displaydata?.peopleNotes?.withoutPayRise?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.peopleNotes?.withoutPayRise
                                      ?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.peopleNotes?.withoutPayRise
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
            </Collapse>
          </Scrollbars>
        </div>
      </div>
    </>
  );
};

export default PeopleNotes;
