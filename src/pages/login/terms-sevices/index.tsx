import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../services/apicall';
import {
  hideLoader,
  logout,
  setUserDetails,
  showLoader,
} from '../../../reduxStore/appSlice';
import Toaster from '../../../components/toast';
import { getImageFroms3Bucket } from '../../../services/s3Bucket';
import { RootReduxProps } from '../../../reduxStore/reduxInterface';
import { LoginLabel } from '../../../components/loginComponents/constants';
const TermService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pdfTC, setTCPdf] = useState(null);
  const { userDetails, termsPDFData } = useSelector(
    (state: RootReduxProps) => state.app,
  );
  interface tenantProps {
    tc_file?: string;
    tc_updated?: string;
  }

  const getTenantDetails: tenantProps =
    termsPDFData?.length > 0 ? termsPDFData?.[0] : {};
  const formattedDate = new Date(
    getTenantDetails?.tc_updated,
  ).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  useEffect(() => {
    getTenantDetails?.tc_file && getPdfUrl();
    dispatch(hideLoader());
  }, []);
  const getPdfUrl = () => {
    getImageFroms3Bucket(
      getTenantDetails?.tc_file,
      'image',
      data => {
        if (data) setTCPdf(data);
      },
      false,
      'ges',
    );
  };
  const sucessCallBack = (data, res) => {
    Toaster(res?.data?.code, res?.data?.message);
    dispatch(hideLoader());
    if (res?.data?.code == '200') {
      const obj = { ...userDetails, is_login: 1 };
      dispatch(setUserDetails(obj));
      window.location.href = '/dashboard';
    } else {
      navigate('/');
    }
  };
  const handleClick = value => {
    if (value === 1) {
      const data = {
        is_accept: value,
      };
      dispatch(showLoader());
      postData('auth/api/acceptTermsConditions', data, sucessCallBack);
    } else {
      dispatch(logout());
      navigate('/');
    }
  };
  return (
    <>
      <div className="term-service-grp d-flex align-items-center">
        <div className="terms-wrapper">
          <div className="container">
            <div className="term-service card">
              <div className="card-header">
                <h3>{LoginLabel.Terms_service}</h3>
                <span>{formattedDate}</span>
              </div>
              <div className="card-body">
                {pdfTC && (
                  <embed
                    src={pdfTC}
                    type="application/pdf"
                    height="1000px"
                    width="100%"
                  ></embed>
                )}
              </div>
              <div className="card-footer text-center">
                <div className="accept-btn">
                  <Link
                    to="#"
                    className="btn btn-primary"
                    onClick={() => handleClick(1)}
                  >
                    {LoginLabel.Accept}
                  </Link>
                </div>
                <div className="decline-terms">
                  <Link to="#" onClick={() => handleClick(0)}>
                    {LoginLabel.Decline}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermService;
