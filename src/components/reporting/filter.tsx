import React, { useEffect, useRef, useState } from "react";
import { Col, DatePicker, Row, Select } from "antd";
import BookLocationSelect from "../../components/reporting/dashboardBookSelect";
import DropDownSelection from "../selectfield/dropDownSelection";
import { Link } from "react-router-dom";
import {
  TeamIcon,
  dropdown_angle,
  info,
  menuDots,
  monthIcon,
} from "../imagepath";
import dayjs from "dayjs";
import DateRangePicker from "./dataRange";
import { postData } from "../../services/apicall";
import { getData } from "../../services/reportingapicall";
import { getUserAgainstLocateDetails } from "../../services/apiurl";
import TeamBookingDetails from "../../pages/userViewLocate/teamBookingDetails";

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

interface searchDetailsProps {
  locatelabel: string;
  search_id: string;
  search_location_id: string;
  floorId: string;
}

const FilterComponent = (props: any) => {
  const {
    selectedTeam,
    setSelectedTeam,
    selectedTeamId,
    setSelectedTeamId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    locationSelectId,
    setLocationSelectId,
    locationSelectLevel,
    setLocationSelectLevel,
    setInitialLocationSelectId,
    setInitialLocationSelectLevel,
    initialValue,
    setResetDefaultBuliding,
    setResetDefaultFloor,
    initialLocationSelectId,
    initialLocationSelectLevel,
    resetDefaultBuliding,
    resetDefaultFloor,
    tabinfo
    
  } = props;

  const [searchDetails, setSearchDetails] = useState<searchDetailsProps | any>(
    '',
  );
  const [locateTeamDropdownDetail, setLocateTeamDropdownDetail] =
    useState<any>('');
  const [floorplanColapse, setFloorplanColapse] = useState(false);
  const dropdownRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = event => {
    const element = event.target.parentNode.className; // Replace with your element's ID or a reference
    if (element != 'locate-managehead' && element != 'dropDownClose') {
      setFloorplanColapse(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getLocateTeamDropdownList = () => {
    const payload = {};
    postData(getUserAgainstLocateDetails, payload, (data, res) => {
      if (res?.data?.code == 200) {
        setLocateTeamDropdownDetail(data);
      } else {
        setLocateTeamDropdownDetail({});
      }
    });
  };

  useEffect(() => {
    setSearchDetails('');
    getLocateTeamDropdownList();
  }, [selectedTeam, selectedTeamId]);

  const handleTeamChange = team => {
    setSelectedTeam(team.name);
    setSelectedTeamId(team.id);
    // setSelectedTeamId([...selectedTeamId, team.team_id]);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <div className="booking-filter book-right-info booking-filter-report">
            <ul className="nav">
              <BookLocationSelect
                locationSelectId={locationSelectId}
                setLocationSelectId={setLocationSelectId}
                locationSelectLevel={locationSelectLevel}
                setLocationSelectLevel={setLocationSelectLevel}
                setInitialLocationSelectId={setInitialLocationSelectId}
              setInitialLocationSelectLevel={setInitialLocationSelectLevel}
              setResetDefaultBuliding={setResetDefaultBuliding}
              setResetDefaultFloor={setResetDefaultFloor}
              initialValue={initialValue}
              initialLocationSelectId={initialLocationSelectId}
              initialLocationSelectLevel={initialLocationSelectLevel}
              resetDefaultBuliding={resetDefaultBuliding}
              resetDefaultFloor={resetDefaultFloor}
              />

              <li>
                <div className="locate-team">
                  {/* floorplan */}
                  <div className="locate-manage-info">
                    <div className="locate-manage">
                      <div className="locate-managehead">
                        <Link
                          data-bs-toggle="collapse"
                          to="#locate"
                          role="button"
                          aria-controls="locate"
                          className="dropDownClose"
                          onClick={() => setFloorplanColapse(!floorplanColapse)}
                        >
                          {selectedTeam}
                          <img
                            src={dropdown_angle}
                            alt="img"
                            className={
                              floorplanColapse
                                ? 'collapse-rotate'
                                : 'collapse-norotate'
                            }
                          />
                        </Link>
                      </div>
                      <div
                        ref={dropdownRef}
                        className="dropdown-menu"
                        id="locate"
                        style={{ display: floorplanColapse ? 'block' : 'none' }}
                      >
                        <div className="locate-dropdown-inner">
                          <h6>Your teams</h6>
                          {locateTeamDropdownDetail?.primary?.length > 0 &&
                            locateTeamDropdownDetail?.primary?.map(i => {
                              return (
                                <Link
                                  to="#"
                                  key={i?.id}
                                  onClick={() => {
                                    handleTeamChange(i);
                                    setFloorplanColapse(false);
                                  }}
                                >
                                  {i?.name}
                                </Link>
                              );
                            })}
                          {locateTeamDropdownDetail?.secondary?.length > 0 &&
                            locateTeamDropdownDetail?.secondary?.map(i => {
                              return (
                                <Link
                                  to="#"
                                  key={i?.id}
                                  onClick={() => {
                                    handleTeamChange(i);
                                    setFloorplanColapse(false);
                                  }}
                                >
                                  {i?.name}
                                </Link>
                              );
                            })}
                        </div>

                        <div className="locate-dropdown-inner">
                          <Link
                            to="#"
                            onClick={() => {
                              setSelectedTeam('All teams');
                              setSelectedTeamId('all');
                              setFloorplanColapse(false);
                            }}
                          >
                            All Teams
                          </Link>

                          {locateTeamDropdownDetail?.other?.length > 0 &&
                            locateTeamDropdownDetail?.other?.map(i => {
                              return (
                                <Link
                                  to="#"
                                  key={i?.id}
                                  onClick={() => {
                                    handleTeamChange(i);

                                    setFloorplanColapse(false);
                                  }}
                                >
                                  {i?.name}
                                </Link>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="reportdatepicker">
                <DateRangePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  initialValue={initialValue}
                  tabinfo={tabinfo}
                />
              </li>
              <li>
                <a href="#"></a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FilterComponent;
