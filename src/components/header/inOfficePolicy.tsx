import React, { useEffect, useState } from 'react';
import { postData } from '../../services/apicall';
import { inOfficePolicy } from '../../services/apiurl';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../toast';
import { useLocation } from 'react-router-dom';

export default function InOfficePolicy() {
  const dispatch = useDispatch();
  const [list, setList] = useState<any>('');
  const location = useLocation();
  const { deleteAssetinDashboard, dashboardListUpdate } = useSelector(
    (state: any) => state.dashboard,
  );
  useEffect(() => {
    if (location?.pathname == '/dashboard') {
      getInOfficePolicy();
    } else {
      setList('');
    }
  }, [location?.pathname, deleteAssetinDashboard, dashboardListUpdate]);
  const getInOfficePolicy = () => {
    postData(inOfficePolicy, '', (data, res) => {
      if (res?.data?.code == 200) {
        setList(data);
      }
      // else {
      //   Toaster(res?.data?.code, res?.data?.message);
      // }
    });
  };
  const InOfficeCalculation = () => {
    const totalInofficePolicy = Number(list[0]?.total_inoffice_policy);
    const remainingToBook = Number(list[0]?.remaining_to_book);
    const total = totalInofficePolicy - remainingToBook;
    const spanElements = Array.from({ length: totalInofficePolicy }).map(
      (_, index) => (
        <span
          key={index}
          className={`progress-default ${
            remainingToBook == 0
              ? 'progress-active'
              : total > index
              ? 'progress-unactive'
              : ''
          }`}
        ></span>
      ),
    );
    return spanElements;
  };
  return (
    <React.Fragment>
      {list[0]?.total_inoffice_policy && (
        <>
          <li className="in-office-nav">
            <div
              className={`in-office-box ${
                Number(list[0]?.remaining_to_book) == 0 &&
                'in-office-box-active'
              }`}
            >
              <div className="in-office-box-icon">
                <i className="far fa-circle-check"></i>
              </div>
              <div className="in-office-text">
                <p>
                  In-office Policy{' '}
                  <span>- {list[0]?.total_inoffice_policy} days/week</span>
                </p>
              </div>
            </div>
          </li>
          <li className="in-office-progress-nav">
            <div className="in-office-progress">
              <div className="in-office-progress-bar">
                {InOfficeCalculation()}
              </div>
              {Number(list[0]?.remaining_to_book) == 0 ? (
                <div className="in-office-progress-text progress-text-active">
                  <p>{'Perfect Week!'}</p>
                </div>
              ) : (
                <div className="in-office-progress-text">
                  <p>
                    {list[0] ? Number(list[0]?.remaining_to_book) : 0} day(s) to
                    book
                  </p>
                </div>
              )}
            </div>
          </li>
        </>
      )}
    </React.Fragment>
  );
}
