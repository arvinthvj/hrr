import React, { useContext, useEffect, useState } from 'react';
import {
  permission_08,
  permission_09,
  permission_21,
  permission_22,
  permission_23,
  permission_24,
  permission_25,
  permission_26,
} from '../../imagepath';
import { PermissionSection } from './permissionComponents';
import { HRSettingsContext } from '../../context/context';
type PermissionObjectProps = {
  id: number;
  field_name: string;
  field_label: string;
  permission: number;
};

const Personal = () => {
  const {
    allPermissionList,
    setAllPermissionList,
    scrollHeight,
    allPermissionStatus,
    setAllPermissionStatus,
  } = useContext(HRSettingsContext);
  const { personal } = allPermissionList;

  const [basicInformation, updateBasicInformation] = useState<
    PermissionObjectProps[]
  >([]);
  const [homeAddress, updateHomeAddress] = useState<PermissionObjectProps[]>(
    [],
  );
  const [emergencyContact, updateEmergencyContact] = useState<
    PermissionObjectProps[]
  >([]);
  const [educationList, updateEducationList] = useState<
    PermissionObjectProps[]
  >([]);
  const [certificationList, updateCertificationList] = useState<
    PermissionObjectProps[]
  >([]);
  const [identificationList, updateIdentificationList] = useState<
    PermissionObjectProps[]
  >([]);
  const [VisaList, updateVisaList] = useState<PermissionObjectProps[]>([]);
  const [clearanceTypeList, updateclearanceTypeList] = useState<
    PermissionObjectProps[]
  >([]);
  const [vaccinationStatuList, updateVaccinationStatusList] = useState<
    PermissionObjectProps[]
  >([]);

  useEffect(() => {
    // const { personal } = allPermissionList
    if (personal) {
      if (personal?.basic_information.length > 0) {
        updateBasicInformation(personal?.basic_information);
      }
      if (personal?.home_address.length > 0) {
        updateHomeAddress(personal?.home_address);
      }
      if (personal?.emergency_contact.length > 0) {
        updateEmergencyContact(personal?.emergency_contact);
      }
      if (personal?.education.length > 0) {
        updateEducationList(personal?.education);
      }
      if (personal?.certification.length > 0) {
        updateCertificationList(personal?.certification);
      }
      if (personal?.identification.length > 0) {
        updateIdentificationList(personal?.identification);
      }
      if (personal?.visa.length > 0) {
        updateVisaList(personal?.visa);
      }
      if (personal?.clearance.length > 0) {
        updateclearanceTypeList(personal?.clearance);
      }
      if (personal?.vaccination.length > 0) {
        updateVaccinationStatusList(personal?.vaccination);
      }
      setAllPermissionStatus(false);
    }
  }, [allPermissionList]);

  useEffect(() => {
    setAllPermissionList({
      ...allPermissionList,
      personal: {
        basic_information: basicInformation,
        home_address: homeAddress,
        emergency_contact: emergencyContact,
        education: educationList,
        certification: certificationList,
        identification: identificationList,
        visa: VisaList,
        clearance: clearanceTypeList,
        vaccination: vaccinationStatuList,
      },
    });
  }, [
    basicInformation,
    homeAddress,
    emergencyContact,
    educationList,
    certificationList,
    identificationList,
    VisaList,
    clearanceTypeList,
    vaccinationStatuList,
  ]);

  return (
    <div className="tab-pane fade show active">
      <div className="permission-scroll" style={{ maxHeight: scrollHeight }}>
        <PermissionSection
          image={permission_08}
          title="Basic information"
          list={basicInformation}
          updatePermission={updateBasicInformation}
        />
        <PermissionSection
          image={permission_09}
          title="Home address"
          list={homeAddress}
          updatePermission={updateHomeAddress}
        />
        <PermissionSection
          image={permission_21}
          title="Emergency contact"
          list={emergencyContact}
          updatePermission={updateEmergencyContact}
        />
        <PermissionSection
          image={permission_22}
          title="Education"
          list={educationList}
          updatePermission={updateEducationList}
        />
        <PermissionSection
          image={permission_23}
          title="Certifications"
          list={certificationList}
          updatePermission={updateCertificationList}
        />
        <PermissionSection
          image={permission_24}
          title="Identification"
          list={identificationList}
          updatePermission={updateIdentificationList}
        />
        <PermissionSection
          image={permission_25}
          title="Visa"
          list={VisaList}
          updatePermission={updateVisaList}
        />
        <PermissionSection
          image={permission_25}
          title="Clearance types"
          list={clearanceTypeList}
          updatePermission={updateclearanceTypeList}
        />
        <PermissionSection
          image={permission_26}
          title="Vaccination status"
          list={vaccinationStatuList}
          updatePermission={updateVaccinationStatusList}
        />
      </div>
    </div>
  );
};

export default Personal;
