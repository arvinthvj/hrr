import React, { useContext, useEffect } from 'react';
import HealthInsurance from './healthInsurance';
import GeneralBenefits from './generalBenefit';
import Pension from './pension';
import { PersonalContext } from '../personalController';

const HrBenefits = () => {
  const { scrollHeightWithOutFooter, getBenefitData } =
    useContext(PersonalContext);

  useEffect(() => {
    getBenefitData();
  }, []);

  return (
    <>
      <div
        className="personal-info tab-scroll"
        style={{ height: scrollHeightWithOutFooter }}
      >
        <div className="benefits-details">
          <GeneralBenefits />
        </div>
        <HealthInsurance />
        <Pension />
      </div>
    </>
  );
};

export default HrBenefits;
