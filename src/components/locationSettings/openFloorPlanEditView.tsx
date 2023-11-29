import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import { LocationFloorPlanDetails } from '../../services/apiurl';
import { Card, Col } from 'antd';
import { Descriptions } from './constant';
import { floorDetailsUrl } from '../../assets/constants/pageurl';

export const OpenFloorplanEditorView = ({
  rightSideBar,
  lastLocation,
  locationPaths,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFloorListDetails = () => {
    const preparData = {
      location_id: lastLocation.id,
    };
    dispatch(showLoader());
    postData(LocationFloorPlanDetails, preparData, success => {
      const locationName =
        locationPaths.at(-2)?.name + ' ' + locationPaths.at(-1)?.name;
      const locationId = locationPaths.at(-1)?.id;
      dispatch(hideLoader());
      if (success == 'No data') {
        navigate(floorDetailsUrl, {
          state: {
            floorDetails: {
              location_id: locationId,
              location_name: locationName,
            },
          },
        });
      } else {
        if (success.length > 0) {
          navigate(floorDetailsUrl, {
            state: { floorDetails: success[0] },
          });
        } else {
          navigate(floorDetailsUrl, {
            state: {
              floorDetails: {
                location_id: locationId,
                location_name: locationName,
              },
            },
          });
        }
      }
    });
  };

  return (
    <Col
      span={6}
      style={{
        maxWidth: rightSideBar,
        position: 'absolute',
      }}
      className={`col-xl-3 col-sm-12 new-location-plus locations-create locations-create-right active book-right-card left-right-space main-space-remove-left d-flex `}
    >
      <div className="card location-right-hight w-100 p-0">
        <div className="location-card-img location-left-card location-card-img-info">
          <div className="location-card-img-btn">
            <Link
              to="#"
              className="btn"
              onClick={() => {
                getFloorListDetails();
              }}
            >
              {Descriptions.openInFloorEditor}
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};
