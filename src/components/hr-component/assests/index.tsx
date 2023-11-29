import React, { useContext, useEffect } from 'react';
import Assets from './assets';
import { PersonalContext } from '../personalController';

const HrAssets = () => {
  const { getHrAssetsData, scrollHeightWithOutFooter } =
    useContext(PersonalContext);

  useEffect(() => {
    getHrAssetsData();
  }, []);

  return (
    <div
      className="personal-info tab-scroll"
      style={{ height: scrollHeightWithOutFooter }}
    >
      <Assets />
    </div>
  );
};

export default HrAssets;
