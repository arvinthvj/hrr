import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImageFroms3Bucket } from '../../services/s3Bucket';
import { CompanyLogoPath } from './constant';

const CompanyLogo = () => {
  const [imageUrl, setImageUrl] = useState<any>(null);
  const { companyLogo, orgDetail } = useSelector((state: any) => state.app);

  useEffect(() => {
    if (companyLogo) {
      getImageFroms3Bucket(
        companyLogo,
        'image',
        data => {
          console.log(data,"data logo")
          setImageUrl(data);
        },
        true,
      );
    }
  }, [companyLogo, orgDetail?.org_name]);
  return (
    <li className="sidebar-logo-info">
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img
            src={companyLogo ? imageUrl : CompanyLogoPath}
            className="img-fluid"
            alt="Company Logo"
            height={100}
            width={400}
          />
        </Link>
      </div>
    </li>
  );
};

export default CompanyLogo;
