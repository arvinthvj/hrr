import React, { useState } from 'react';
import { birthday, info, workanniversary } from '../../../imagepath';
import { Collapse, Popover } from 'antd';
const { Panel } = Collapse;
import { Scrollbars } from 'react-custom-scrollbars';
import { timeOff_4 } from '../../../imagepath';
import { GetImgaeFromS3Bucket } from '../../../../services/s3Bucket';
import { findFirst_LastName } from '../../../../assets/globals';

const EventsToday = props => {
  const [summaryLength, setSummaryLength] = useState(6);
  const [panelkeys, setpanelkeys] = useState(['1', '2', '3']);
  const Displaydata = props?.data?.data;

  return (
    <>
      <div className="card-d-flex">
        <div className="card card-shadow card-chart card-event">
          <div className="report-card-map-header">
            <h3>
              Events Today
              <Popover content="Header">
                <img src={info} alt="" />
              </Popover>
            </h3>
          </div>
          <div className="card-count-grid">
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Public Holiday</h6>
              <div className="count-cell-info">
                <img src={timeOff_4} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.eventNotes?.publicHolidays?.length || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Birthdays</h6>
              <div className="count-cell-info">
                <img src={birthday} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.eventNotes?.birthday?.length || 0}
                </span>
              </div>
            </div>
            <div className="card-count-cell">
              <h6 className="count-cell-hdr">Work Anniversary</h6>
              <div className="count-cell-info">
                <img src={workanniversary} alt="" />
                <span className="re-count-badge">
                  {Displaydata?.eventNotes?.workAnniversary?.length || 0}
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
              <Panel header="Public Holidays" key="1">
                {Displaydata?.eventNotes?.publicHolidays?.length > 0 ? (
                  Displaydata?.eventNotes?.publicHolidays?.map(obj => (
                    <div className="d-flex mb-2">
                      <div className="card-flex-info">
                        <p className="grey mb-1 f14-400">{obj?.calendar}</p>
                        <h5 className="hotdeskblue">{obj?.title}</h5>
                      </div>
                    </div>
                  ))
                ) : (
                  <section className="ant-layout working-no-records woking-records">
                    No records
                  </section>
                )}
              </Panel>
              <Panel header="Birthdays" key="2">
                {Displaydata?.eventNotes?.birthday?.length > 0 ? (
                  Displaydata?.eventNotes?.birthday?.map(obj => (
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
                        <p className="grey mb-0 f14-400">{obj?.age}</p>
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
              {!panelkeys.includes('2') && (
                <div className="container office-team">
                  <div className="team-box p-16">
                    <ul>
                      <li>
                        <div className="team-groups floor-groups floor-groups-scroll">
                          <div className="avatar-group">
                            <>
                              {Displaydata?.eventNotes?.birthday?.length > 0
                                ? Displaydata?.eventNotes?.birthday
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
                            {Displaydata?.eventNotes?.birthday?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.eventNotes?.birthday?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.eventNotes?.birthday?.length -
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
              <Panel header="Work Anniversaries" key="3">
                {Displaydata?.eventNotes?.workAnniversary?.length > 0 ? (
                  Displaydata?.eventNotes?.workAnniversary?.map(obj => (
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
                          {obj?.year || 0} years
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
                              {Displaydata?.eventNotes?.workAnniversary
                                ?.length > 0
                                ? Displaydata?.eventNotes?.workAnniversary
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
                            {Displaydata?.eventNotes?.workAnniversary?.length >
                              summaryLength && (
                              <div
                                className="avatar"
                                onClick={() =>
                                  setSummaryLength(
                                    Displaydata?.eventNotes?.workAnniversary
                                      ?.length,
                                  )
                                }
                              >
                                <span className="avatar-title rounded-circle border border-white">
                                  +{' '}
                                  {Displaydata?.eventNotes?.workAnniversary
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

export default EventsToday;
