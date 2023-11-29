import React, { useContext, useEffect, useState } from 'react';
import { permission_16, permission_17, permission_18 } from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';

const Benefits = () => {
  const {
    scrollHeight,
    allPermissionList,
    setAllPermissionList,
    allPermissionStatus,
    setAllPermissionStatus,
  } = useContext(HRSettingsContext);
  const { benefits } = allPermissionList;
  const { benefit, insurance, pension } = benefits?.benefits_details?.reduce(
    (acc, item) => {
      if (item.field_name === 'general_benefits') {
        acc.benefit.push(item);
      } else if (item.field_name === 'health_insurance') {
        acc.insurance.push(item);
      } else if (item.field_name === 'general_Pension') {
        acc.pension.push(item);
      }
      return acc;
    },
    { benefit: [], insurance: [], pension: [] },
  );
  const [benefitsList, updatebenefitsData] = useState(benefit);
  const [insuranceList, updateInsurance] = useState(insurance);
  const [pensionList, updatePensionList] = useState(pension);

  useEffect(() => {
    if (benefits && allPermissionStatus) {
      if (benefits?.benefits_details.length > 0) {
        const { benefit, insurance, pension } =
          benefits?.benefits_details?.reduce(
            (acc, item) => {
              if (item.field_name === 'general_benefits') {
                acc.benefit.push(item);
              } else if (item.field_name === 'health_insurance') {
                acc.insurance.push(item);
              } else if (item.field_name === 'general_Pension') {
                acc.pension.push(item);
              }
              return acc;
            },
            { benefit: [], insurance: [], pension: [] },
          );
        updatebenefitsData(benefit);
        updateInsurance(insurance);
        updatePensionList(pension);
        setAllPermissionStatus(false);
      }
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      benefits: {
        benefits_details: [...benefitsList, ...insuranceList, ...pensionList],
      },
    });
  }, [benefitsList, insuranceList, pensionList]);
  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_16}
          title="General benifits"
          list={benefitsList}
          updatePermission={updatebenefitsData}
        />
        <PermissionSection
          image={permission_17}
          title="Health insurance"
          list={insuranceList}
          updatePermission={updateInsurance}
        />

        <PermissionSection
          image={permission_18}
          title="Pension"
          list={pensionList}
          updatePermission={updatePensionList}
        />
      </div>
    </div>
  );
};

export default Benefits;
