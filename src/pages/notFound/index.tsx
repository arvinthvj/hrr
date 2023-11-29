import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardUrl } from '../../assets/constants/pageurl';
import { Labels } from './constant';
import { Button } from 'antd';

const NotFound = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate(dashboardUrl);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{Labels.pageNotFound}</h1>
      <Button type="primary" onClick={navigateToDashboard}>
        {Labels.home}
      </Button>
    </div>
  );
};

export default NotFound;
