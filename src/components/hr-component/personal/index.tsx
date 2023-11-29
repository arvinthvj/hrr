import React, { useContext, useState } from 'react';
import PersonalDetails from './personalDetails';
import Address from './address';
import Contact from './contact';
import Education from './education';
import Certificate from './certificate';
import Identifications from './identifications';
import Visa from './visa';
import Clearance from './clearance';
import Vaccination from './vaccination';
import { PersonalInfo } from './scehma';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormFooter from './footer';
import { PersonalContext } from '../personalController';
import {
  homeAddressKeys,
  sectionNames,
} from '../../../assets/constants/config';

const HrPersonal = () => {
  const {
    handleSubmit,
    setValue,
    control,
    trigger,
    watch,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(PersonalInfo) });

  const { allFieldPermissionType, scrollHeight } = useContext(PersonalContext);
  const [cancel, setCancel] = useState('');

  const findIndex = (sectionNames, type = 'Details') => {
    const findObj = allFieldPermissionType.find(
      obj => obj.section_name == sectionNames && obj.field_name == type,
    );
    if (findObj?.permission && findObj?.permission != '0') {
      return findObj?.permission;
    } else {
      return null;
    }
  };

  const validateHomeAddressPermission = () => {
    let valid = false;
    for (const property in homeAddressKeys) {
      if (findIndex(sectionNames.home_address, homeAddressKeys[property])) {
        valid = true;
        return true;
      }
    }
    valid;
  };

  return (
    <div
      className="tab-pane fade show active"
      id="personal_tab"
      role="tabpanel"
      aria-labelledby="personal-tab"
    >
      <form>
        <div
          className="personal-info tab-scroll"
          style={{ height: scrollHeight }}
        >
          <PersonalDetails
            setValue={setValue}
            control={control}
            trigger={trigger}
            errors={errors}
            watch={watch}
            cancel={cancel}
          />
          {validateHomeAddressPermission() && (
            <Address
              setValue={setValue}
              control={control}
              trigger={trigger}
              errors={errors}
              cancel={cancel}
            />
          )}
          {findIndex(sectionNames.emergency_contact) && <Contact />}
          {findIndex(sectionNames.education) && <Education />}
          {findIndex(sectionNames.certification) && <Certificate />}
          {findIndex(sectionNames.identification) && <Identifications />}
          {findIndex(sectionNames.visa) && <Visa />}
          {findIndex(sectionNames.clearance) && <Clearance />}
          {findIndex(sectionNames.vaccination) && <Vaccination />}
        </div>
        <FormFooter
          handleSubmit={handleSubmit}
          isDirty={isDirty}
          errors={errors}
          setCancel={setCancel}
        />
      </form>
    </div>
  );
};

export default HrPersonal;
