import React, { useContext, useState } from 'react';
import Information from './information';
import Location from './location';
import History from './history';
import Teams from './teams';
import Manager from './manager';
import Report from './report';
import Compensation from './compensation';
import FormFooter from './footer';
import { yupResolver } from '@hookform/resolvers/yup';
import { information } from '../personal/scehma';
import { useForm } from 'react-hook-form';
import { PersonalContext } from '../personalController';
import { jobSecction } from '../../../assets/constants/config';
const HrJobs = () => {
  const { informationList, allFieldPermissionType, scrollHeight } =
    useContext(PersonalContext);

  const [cancel, setCancel] = useState('');
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    getValues,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(information) });
  const [removeDisabled, setRemoveDisabled] = useState(false);

  const findIndex = (sectionNames, type = 'Details') => {
    const findObj = allFieldPermissionType.find(
      obj => obj.section_name == sectionNames && obj.field_name == type,
    );
    return findObj?.permission && +findObj?.permission !== 0
      ? findObj.permission
      : null;
  };

  return (
    <div
      className="tab-pane"
      id="job_tab"
      role="tabpanel"
      aria-labelledby="job-tab"
    >
      <form>
        <div
          className="personal-info tab-scroll"
          style={{ height: scrollHeight }}
        >
          <Information
            control={control}
            trigger={trigger}
            errors={errors}
            setValue={setValue}
            cancel={cancel}
            informationList={informationList}
          />
          <Location
            control={control}
            trigger={trigger}
            errors={errors}
            setValue={setValue}
            cancel={cancel}
            reset={reset}
            setRemoveDisabled={setRemoveDisabled}
            informationList={informationList}
          />
          {findIndex(jobSecction.workhistory) && (
            <History informationList={informationList} />
          )}
          {findIndex(jobSecction.Teams) && (
            <Teams informationList={informationList} />
          )}
          {findIndex(jobSecction.Managers) && (
            <Manager informationList={informationList} />
          )}
          {findIndex(jobSecction.DirectReport) && (
            <Report informationList={informationList} />
          )}
          {findIndex(jobSecction.CompensationandBonus) && (
            <Compensation informationList={informationList} />
          )}
        </div>
        <FormFooter
          handleSubmit={handleSubmit}
          isDirty={isDirty}
          errors={errors}
          removeDisabled={removeDisabled}
          setRemoveDisabled={setRemoveDisabled}
          setCancel={setCancel}
        />
      </form>
    </div>
  );
};

export default HrJobs;
