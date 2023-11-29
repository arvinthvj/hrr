import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { postData } from '../../services/apicall';
import {
  assignedUser,
  bookedTimeOff,
  countryListAPI,
  getHrAssetsList,
  getHrBenifitsInsurance,
  hrGetPreferencesList,
  hrJobsWorkInformation,
  hrPermissionFieldsList,
  hrUpdateDefaultTime,
  personalChangeHistoryAPI,
  personalDetailsAPI,
  saveUserDetails,
  unAssignedUser,
  workStatus,
} from '../../services/apiurl';
import {
  hideLoader,
  setUserDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../toast';
import { Editdata, PersonalContextProps } from './context';
import {
  checkHrModuleRightsideView,
  getPrefereredTimeToSave,
  getUserPreferedDateFormat,
} from '../commonMethod';
import DocumentViewer from './personal/documentViewer';
import NotesViewer from './personal/notesViewer';
import {
  ErrorMessage,
  Errorcode,
  countryCodeValues,
  emergencyContactKeys,
  sectionNames,
  timeFormats_24,
} from '../../assets/constants/config';

import {
  setAssetsData,
  setAssignedUserList,
  setBeneFitInsuranceData,
  setBenefitData,
  setPensionData,
  setPreferenceData,
  setUnAssignedUserList,
} from '../../reduxStore/hrSlice';
import moment from 'moment';
import { HR_BENEFIT_TYPE } from './benefits/constants';

type ErrorComponent = styled<'p', any, never>;
const Error: ErrorComponent = styled.p({
  color: 'red',
});
interface Detaislprops {
  Error: any;
  AddComponent: any;
  EditComponent: any;
  addTitle: any;
  editTitle: any;
  editData: any;
  setEditData: any;
  addPersonalDetail: any;
  listData: any;
  primaryList: any;
  educationList: any;
  certificationList: any;
  identificationList: any;
  loading: any;
  countrycodeList: any;
  visaList: any;
  clearanceList: any;
  vaccinationList: any;
  countryList: any;
  historyList: any;
  getUserPersonalDetails: any;
  setPrimaryList: any;
  setEducationList: any;
  setCertificationList: any;
  setIdentificationList: any;
  setVisaList: any;
  setClearanceList: any;
  setVaccinationList: any;
  getHistoryList: any;
  updateViewDocuments: any;
  updateViewNotes: any;
  allFieldPermissionType: any;
  informationList: any;
  GetJobDetails: any;
  details: any;
  createRecordFlag: any;
  isAddDisable: any;
  workStatusOption: any;
  detailsId: any;
  setEditBookOff: any;
  editBookOff: any;
  getListData: any;
  upcomingData: any;
  pastData: any;
  gridDetails: any;
  getAllPreferenceDetail: any;
  setIsPrefereneceSaveButton: any;
  setPreferenceStartTime: any;
  setPreferenceEndTime: any;
  preferenceStartTime: any;
  preferenceEndTime: any;
  updatePreferenceTimeData: any;
  isPreferenceSaveButton: any;
  resetPreferenceData: any;
  preferenceLanguageId: any;
  setPreferenceLanguageId: any;
  vehicleRegNumber: any;
  setVehicleRegNumber: any;
  userID: any;
  locationState: any;
  getHrBenefitsInsuranceData: any;
  getHrBenefitsData: any;
  getHrPensionData: any;
  getHrAssetsData: any;
  setLeaveDays: any;
  leaveDays: any;
  scrollHeight: any;
  scrollHeightWithOutFooter: any;
  scrollHeightForLeave: any;
  rightSidebarHeight: any;
  getBenefitData: any;
  leaveId: any;
  setLeaveId: any;
  selectedNodes: any;
  setSelectedNodes: any;
  getAssignedUser: any;
  getUnAssignedUser: any;
  rightSidebarHeightForLeave: any;
  setUserID: any;
}
const PersonalContext = createContext<Detaislprops>({
  addTitle: undefined,
  Error: undefined,
  AddComponent: undefined,
  EditComponent: undefined,
  editTitle: undefined,
  editData: undefined,
  setEditData: undefined,
  addPersonalDetail: undefined,
  listData: undefined,
  primaryList: undefined,
  educationList: undefined,
  certificationList: undefined,
  identificationList: undefined,
  loading: undefined,
  countrycodeList: undefined,
  visaList: undefined,
  clearanceList: undefined,
  vaccinationList: undefined,
  countryList: undefined,
  historyList: undefined,
  getUserPersonalDetails: undefined,
  setPrimaryList: undefined,
  setEducationList: undefined,
  setCertificationList: undefined,
  setIdentificationList: undefined,
  setVisaList: undefined,
  setClearanceList: undefined,
  setVaccinationList: undefined,
  getHistoryList: undefined,
  updateViewDocuments: undefined,
  updateViewNotes: undefined,
  allFieldPermissionType: undefined,
  informationList: undefined,
  GetJobDetails: undefined,
  details: undefined,
  createRecordFlag: undefined,
  isAddDisable: undefined,
  workStatusOption: undefined,
  detailsId: undefined,
  setEditBookOff: undefined,
  editBookOff: undefined,
  getListData: undefined,
  upcomingData: undefined,
  pastData: undefined,
  gridDetails: undefined,
  getAllPreferenceDetail: undefined,
  setIsPrefereneceSaveButton: undefined,
  preferenceStartTime: undefined,
  preferenceEndTime: undefined,
  setPreferenceStartTime: undefined,
  setPreferenceEndTime: undefined,
  updatePreferenceTimeData: undefined,
  isPreferenceSaveButton: undefined,
  resetPreferenceData: undefined,
  preferenceLanguageId: undefined,
  setPreferenceLanguageId: undefined,
  vehicleRegNumber: undefined,
  setVehicleRegNumber: undefined,
  userID: undefined,
  locationState: undefined,
  getHrBenefitsInsuranceData: undefined,
  getHrBenefitsData: undefined,
  getHrPensionData: undefined,
  getHrAssetsData: undefined,
  setLeaveDays: undefined,
  leaveDays: undefined,
  scrollHeight: undefined,
  scrollHeightWithOutFooter: undefined,
  scrollHeightForLeave: undefined,
  rightSidebarHeight: undefined,
  rightSidebarHeightForLeave: undefined,
  getBenefitData: undefined,
  leaveId: undefined,
  setLeaveId: undefined,
  selectedNodes: undefined,
  setSelectedNodes: undefined,
  getAssignedUser: undefined,
  getUnAssignedUser: undefined,
  setUserID: undefined,
});

const PersonalController = (props: PersonalContextProps) => {
  const [addTitle, setAddTitle] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editData, setEditData] = useState<Editdata[] | any>([]);
  const [listData, setListData] = useState([]);
  const [primaryList, setPrimaryList] = useState<any>([]);
  const [educationList, setEducationList] = useState<any>([]);
  const [certificationList, setCertificationList] = useState<any>([]);
  const [identificationList, setIdentificationList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [countryList, setCountryList] = useState<any>([]);
  const [countrycodeList, setCountrycodeList] = useState<any>([]);
  const [informationList, setInformationList] = useState<any>([]);
  const [height, setHeight] = useState<any>(window.innerHeight);
  const [historyList, setHistoryList] = useState<any>([]);
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [visaList, setVisaList] = useState<any>([]);
  const [clearanceList, setClearanceList] = useState<any>([]);
  const [vaccinationList, setVaccinationList] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [detailsId, setDetailsId] = useState<any>('');
  const [leaveId, setLeaveId] = useState<any>('');
  const [workStatusOption, setWorkStatusOption] = useState([]);
  const [editBookOff, setEditBookOff] = useState();
  const [upcomingData, setUpcomingData] = useState([]);
  const [pastData, setPastData] = useState([]);
  const [gridDetails, setGridDetails] = useState([]);
  const [leaveDays, setLeaveDays] = useState([]);
  const [isPreferenceSaveButton, setIsPrefereneceSaveButton] = useState(true);
  const [preferenceStartTime, setPreferenceStartTime] = useState(
    moment(new Date()).format(timeFormats_24),
  );
  const [preferenceEndTime, setPreferenceEndTime] = useState(
    moment(new Date()).format(timeFormats_24),
  );
  const [preferenceLanguageId, setPreferenceLanguageId] = useState<any>();
  const [vehicleRegNumber, setVehicleRegNumber] = useState<any>();

  const { userDetails } = useSelector((state: any) => state?.app);
  const [showSelectedDocumentModal, setShowSelectedDocumentModal] = useState<{
    type: string;
    list: Array<string>;
  } | null>(null);
  const [showSelectedNotesModal, setShowSelectedNotesModal] = useState<{
    type: string;
    notes: string;
  } | null>(null);

  const [allFieldPermissionType, setAllFieldPermisisonType] = useState<any>([]);
  const location = useLocation();
  const [userID, setUserID] = useState('');
  const [locationState, setLocationState] = useState();
  const [scrollHeight, setScrollHeight] = useState<any>();
  const [scrollHeightWithOutFooter, setScrollHeightWithOutFooter] =
    useState<any>();
  const [scrollHeightForLeave, setScrollHeightForLeave] = useState<any>(0);
  const [rightSidebarHeight, setRightSidebarHeight] = useState<any>();
  const [rightSidebarHeightForLeave, setRightSidebarHeightForLeave] =
    useState<any>();

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  const headerHeight = document?.querySelector('.header')?.clientHeight;
  const cardHeight = document?.querySelector('.manager-card')?.clientHeight;
  const tabHeight = document?.querySelector(
    '.manager-tab-header',
  )?.clientHeight;
  const footerHeight =
    document?.querySelector('.personal-footer')?.clientHeight;
  const gridHeight = document?.querySelector('.time-grid-info')?.clientHeight;
  const cardHeader = document?.querySelector('.card-header')?.clientHeight;
  const bookTimeFooter =
    document?.querySelector('.book-time-footer')?.clientHeight;
  const calHeight = headerHeight + cardHeight + tabHeight + footerHeight;
  const calHeightWithoutFooter = headerHeight + cardHeight + tabHeight;
  const calHeightForLeave = headerHeight + cardHeight + tabHeight + gridHeight;
  const calRightSidebarHeight = headerHeight + cardHeader + footerHeight;
  const calRightSidebarHeightForLeave =
    headerHeight + cardHeader + bookTimeFooter;

  useEffect(() => {
    setScrollHeight(
      !Number.isNaN(height - calHeight - 40) && height - calHeight - 40,
    );
    setScrollHeightWithOutFooter(
      !Number.isNaN(height - calHeightWithoutFooter - 40) &&
        height - calHeightWithoutFooter - 40,
    );
    setScrollHeightForLeave(
      !Number.isNaN(height - calHeightForLeave - 40) &&
        height - calHeightForLeave - 40,
    );
    setRightSidebarHeight(
      !Number.isNaN(height - calRightSidebarHeight - 40) &&
        height - calRightSidebarHeight - 40,
    );
    setRightSidebarHeightForLeave(
      !Number.isNaN(height - calRightSidebarHeightForLeave - 40) &&
        height - calRightSidebarHeightForLeave - 40,
    );
  }, [
    height,
    calHeight,
    calRightSidebarHeight,
    calHeightWithoutFooter,
    calHeightForLeave,
    calRightSidebarHeightForLeave,
  ]);
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    setLoading(false);
  }, []);

  useEffect(() => {
    if (location?.state?.leave_id) {
      setLeaveId(location?.state?.leave_id);
    }
  }, [location?.state?.leave_id]);

  useEffect(() => {
    if (location?.state?.user_id) {
      setUserID(location?.state?.user_id);
      setLocationState(location?.state);
    } else {
      setUserID(userDetails?.id);
    }
  }, []);

  const dispatch = useDispatch();
  const getCountryCodeList = () => {
    const filtered = countryCodeValues
      .filter(
        (obj, index) =>
          index ===
          countryCodeValues.findIndex(item => item.value === obj.value),
      )
      .sort((a, b) => +a.value.replace('+', '') - +b.value.replace('+', ''));
    setCountrycodeList(filtered);
  };
  useEffect(() => {
    getCountryCodeList();
  }, []);
  useEffect(() => {
    getHistoryList();
  }, [editData,addTitle, editTitle]);

  const AddComponent = (type, flag = false, size, isPreference = false) => {
    return (
      <table
        className={'table personal-table ' + (size === 0 && 'empty-table-data')}
      >
        <tbody>
          <tr style={{ boxShadow: isPreference ? 'inherit' : '' }}>
            <td
              className={
                !isPreference
                  ? 'data-plus-icon'
                  : 'data-plus-icon data-plus-icon-inner text-end'
              }
            >
              <Link
                to=""
                onClick={() => {
                  if (flag) {
                    setAddTitle(type);
                    setEditTitle('');
                    setEditData([]);
                    props.checkIsOpned(true);
                  }
                  document
                    .getElementsByClassName('page-wrapper')?.[0]
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fas fa-plus"></i>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const getAllPreferenceDetail = () => {
    dispatch(showLoader());
    postData(hrGetPreferencesList, { user_id: userID }, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setPreferenceData(data));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getAssignedUser = () => {
    dispatch(showLoader());
    postData(assignedUser, {}, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setAssignedUserList(data));
      }
    });
  };

  const getUnAssignedUser = () => {
    dispatch(showLoader());
    postData(unAssignedUser, {}, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setUnAssignedUserList(data));
      }
    });
  };

  const getHrBenefitsInsuranceData = () => {
    const payload = {
      user_id: userID,
      type: HR_BENEFIT_TYPE.GENERAL_INSURANCE,
    };
    dispatch(showLoader());
    postData(getHrBenifitsInsurance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const _dt = data?.filter(
          element => element.type == HR_BENEFIT_TYPE.GENERAL_INSURANCE,
        );
        dispatch(setBeneFitInsuranceData(_dt));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getBenefitData = () => {
    const payload = {
      user_id: userID,
      type: HR_BENEFIT_TYPE.GENERAL_INSURANCE,
    };
    dispatch(showLoader());
    postData(getHrBenifitsInsurance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const insu_dt = data?.filter(
          element => element.type == HR_BENEFIT_TYPE.GENERAL_INSURANCE,
        );
        dispatch(setBeneFitInsuranceData(insu_dt));

        const benefit_dt = data?.filter(
          element => element.type == HR_BENEFIT_TYPE.GENERAL_BENEFIT,
        );
        dispatch(setBenefitData(benefit_dt));

        const pension_dt = data?.filter(
          element => element.list_type == HR_BENEFIT_TYPE.PENSION,
        );
        dispatch(setPensionData(pension_dt));

        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getHrBenefitsData = () => {
    const payload = {
      user_id: userID,
    };
    dispatch(showLoader());
    postData(getHrBenifitsInsurance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const _dt = data?.filter(
          element => element.type == HR_BENEFIT_TYPE.GENERAL_BENEFIT,
        );
        dispatch(setBenefitData(_dt));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getHrAssetsData = () => {
    const payload = {
      user_id: userID,
    };
    dispatch(showLoader());
    postData(getHrAssetsList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        dispatch(setAssetsData(data));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getHrPensionData = () => {
    const payload = {
      user_id: userID,
    };
    dispatch(showLoader());
    postData(getHrBenifitsInsurance, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const _dt = data?.filter(
          element => element.list_type == HR_BENEFIT_TYPE.PENSION,
        );
        dispatch(setPensionData(_dt));
        dispatch(hideLoader());
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const EditComponent = (type, data) => {
    setAddTitle('');
    setEditTitle(type);
    setEditData(data);
    props.checkIsOpned(true);
    document
      .getElementsByClassName('page-wrapper')?.[0]
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setDetailsId(details?.id);
  }, [details]);

  const addPersonalDetail = data => {
    dispatch(showLoader());
    const payload = {
      user_id: userID,
      employee_id: data?.employeeid,
      title: data?.title?.value,
      first_name: data?.firstname,
      middle_name: data?.middlename,
      last_name: data?.lastname,
      display_name: data?.displayname,
      birth_date: data?.birthdate,
      marital_status: data?.maritalstatus?.value,
      gender: data?.gender?.value,
      pronoun: data?.pronoun?.value,
      nationality: data?.nationality?.value,
      about: data?.about,
      address1: data?.address1,
      address2: data?.address2,
      city: data?.city,
      state: data?.state,
      zipcode: data?.zipcode,
      country: data?.country,
      home_phone: data?.homephone,
      personal_mobile: data?.personalmobile,
      personal_email: data?.personalemail,
      home_ext: data?.homecode?.value,
      personal_ext: data?.personalcode?.value,
    };
    postData(saveUserDetails, payload, getResponse);
  };

  const getResponse = (data, res) => {
    dispatch(hideLoader());
    if (res?.data?.code == 200) {
      const userDetailCopy = JSON.parse(JSON.stringify(userDetails));
      userDetailCopy.display_name = data?.display_name;
      if (userDetails?.id == userID) {
        dispatch(setUserDetails(userDetailCopy));
      }
      Toaster(res?.data?.code, res?.data?.message);
    } else if (res?.data?.code == 204) {
      Toaster(res?.data?.code, res?.data?.message);
    } else {
      Toaster(Errorcode, ErrorMessage);
    }

    getUserPersonalDetails();
  };

  const updatePreferenceTimeData = () => {
    const payload = {
      user_id: userID,
      start_working_hour: getPrefereredTimeToSave(preferenceStartTime),
      end_working_hour: getPrefereredTimeToSave(preferenceEndTime),
      language_id: preferenceLanguageId,
      vehicle_register_no: vehicleRegNumber,
    };
    dispatch(showLoader());
    postData(hrUpdateDefaultTime, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        Toaster(res?.data?.code, res?.data?.message);
        getAllPreferenceDetail();
        setIsPrefereneceSaveButton(true);
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const resetPreferenceData = () => {
    getAllPreferenceDetail();
    setIsPrefereneceSaveButton(true);
  };

  const getUserPersonalDetails = () => {
    getHistoryList();
    const payload = { user_id: userID };
    dispatch(showLoader());
    postData(personalDetailsAPI, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        data?.find(item => {
          item?.list_type == 'basic_home' && setListData(item);
          item?.list_type == 'emergency_contact' &&
            setPrimaryList(prev => [...prev, item]);

          if (item?.list_type == 'education') {
            setEducationList(prev => [...prev, item]);
          }
          if (item?.list_type == 'certification') {
            setCertificationList(prev => [...prev, item]);
          }
          if (item?.list_type == 'identification') {
            setIdentificationList(prev => [...prev, item]);
          }
          if (item?.list_type == 'visa') {
            setVisaList(prev => [...prev, item]);
          }
          if (item?.list_type == 'clearance') {
            setClearanceList(prev => [...prev, item]);
          }
          if (item?.list_type == 'vaccination') {
            setVaccinationList(prev => [...prev, item]);
          }
          setDetails(data?.[data?.length - 1]);
        });
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const getCountryList = () => {
    postData(countryListAPI, { status: '1' }, (data, res) => {
      if (res?.data?.code == 200) {
        const options = data?.map(item => ({
          label: item?.country_name,
          value: item?.country_name,
          code: item?.country_code,
        }));
        setCountryList(options);
      }
    });
  };
  const getWorkStatus = () => {
    postData(workStatus, '', data => {
      const workStatusOpt = data?.map(item => {
        return {
          label: item?.work_status,
          value: item?.work_status,
        };
      });
      setWorkStatusOption(workStatusOpt);
    });
  };
  const getListData = () => {
    postData(bookedTimeOff.List, { user_id: userID }, (data, res) => {
      setGridDetails(data?.splice(0, 1));
      const title = { formated_date: 'Upcoming', id: Math.random() };
      const title1 = {
        formated_date: 'Past',
        id: Math.random(),
        table_type: 'Past',
      };
      if (res?.data?.code == 200) {
        if (data?.length > 0) {
          data?.forEach(item => {
            item['formated_date'] =
              getUserPreferedDateFormat(item?.from_date) +
              ' - ' +
              getUserPreferedDateFormat(item?.to_date);
          });
          setUpcomingData([
            title,
            ...data?.filter(obj => obj?.recordtype == 'upcoming'),
          ]);
          const PastData = data?.filter(obj => obj?.recordtype == 'past');
          PastData?.forEach(item => {
            item['table_type'] = 'Past';
          });
          setPastData([title1, ...PastData]);
        } else {
          setUpcomingData([title]);
          setPastData([title1]);
        }
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  const findIndex = key => {
    const findObj = allFieldPermissionType?.find(
      obj =>
        obj.section_name == sectionNames.emergency_contact &&
        obj.field_name == key,
    );
    if (findObj?.permission && findObj?.permission != '0') {
      return findObj?.permission;
    } else {
      null;
    }
  };

  const createRecordFlag =
    findIndex(emergencyContactKeys.create) == '2' ? true : false;
  const isAddDisable = findIndex(emergencyContactKeys.create) ? '' : 'yes';

  const getHistoryList = () => {
    const type = checkHrModuleRightsideView(addTitle, editTitle);
    if (type != '') {
      const payload = {
        user_id: userID,
        type: type,
        type_id: editData?.id,
      };
      postData(personalChangeHistoryAPI, payload, (data, res) => {
        if (res?.data?.code == 200) {
          if (data?.length > 0) {
            setHistoryList(data);
          } else {
            setHistoryList([]);
          }
        } else {
          Toaster(Errorcode, ErrorMessage);
        }
      });
    }
  };

  const GetJobDetails = () => {
    const payload = { user_id: userID };
    dispatch(showLoader());
    postData(hrJobsWorkInformation, payload, (data, res) => {
      if (res?.data?.code == 200) {
        dispatch(hideLoader());
        setInformationList(data);
        getListData();
      } else {
        Toaster(Errorcode, ErrorMessage);
      }
    });
  };

  useEffect(() => {
    if (userID) {
      getCountryList();
      getWorkStatus();
      getUserPersonalDetails();
      getHrListFields();
      GetJobDetails();
      getListData();
    }
  }, [userID]);

  useEffect(() => {
    getListData();
  }, []);

  const getHrListFields = () => {
    postData(hrPermissionFieldsList, { user_id: userID }, (data, res) => {
      if (res?.data?.code == 200) {
        setAllFieldPermisisonType(data);
      } else {
        Toaster(Errorcode, ErrorMessage);
        setAllFieldPermisisonType([]);
      }
    });
  };

  useEffect(() => {
    props.checkIsOpned(
      checkHrModuleRightsideView(addTitle, editTitle) ? true : false,
    );
  }, [addTitle, editTitle]);

  const updateViewDocuments = doc => {
    setShowSelectedDocumentModal(doc);
  };
  const updateViewNotes = doc => {
    setShowSelectedNotesModal(doc);
  };
  return (
    <PersonalContext.Provider
      value={{
        Error: Error,
        // ,
        addTitle: addTitle,
        editTitle,
        editData,
        listData,
        primaryList,
        educationList,
        certificationList,
        identificationList,
        loading,
        countrycodeList,
        visaList,
        clearanceList,
        vaccinationList,
        countryList,
        historyList,
        allFieldPermissionType,
        informationList,
        details,
        createRecordFlag,
        isAddDisable,
        workStatusOption,
        detailsId,
        editBookOff,
        upcomingData,
        pastData,
        gridDetails,
        preferenceStartTime,
        preferenceEndTime,
        isPreferenceSaveButton,
        preferenceLanguageId,
        vehicleRegNumber,
        userID,
        locationState,
        leaveDays,
        scrollHeight,
        scrollHeightWithOutFooter,
        scrollHeightForLeave,
        rightSidebarHeight,
        rightSidebarHeightForLeave,
        leaveId,
        selectedNodes,

        getUserPersonalDetails,
        setPrimaryList,
        setLeaveDays,
        setEducationList,
        setCertificationList,
        setIdentificationList,
        setVisaList,
        setClearanceList,
        setVaccinationList,
        getHistoryList,
        updateViewDocuments,
        updateViewNotes,
        setEditData,
        addPersonalDetail,
        AddComponent,
        EditComponent,
        GetJobDetails,
        setEditBookOff,
        getListData,
        getAllPreferenceDetail,
        updatePreferenceTimeData,
        setIsPrefereneceSaveButton,
        setPreferenceStartTime,
        setPreferenceEndTime,
        resetPreferenceData,
        setPreferenceLanguageId,
        setVehicleRegNumber,
        getHrBenefitsInsuranceData,
        getHrBenefitsData,
        getHrPensionData,
        getHrAssetsData,
        getBenefitData,
        setLeaveId,
        setSelectedNodes,
        getAssignedUser,
        getUnAssignedUser,
        setUserID,
      }}
    >
      {props.children}
      {showSelectedDocumentModal &&
        showSelectedDocumentModal?.type &&
        showSelectedDocumentModal?.list?.length > 0 && (
          <DocumentViewer
            details={showSelectedDocumentModal}
            close={() => setShowSelectedDocumentModal(null)}
          />
        )}
      {showSelectedNotesModal &&
        showSelectedNotesModal?.type &&
        showSelectedNotesModal?.notes && (
          <NotesViewer
            details={showSelectedNotesModal}
            close={() => setShowSelectedNotesModal(null)}
          />
        )}
    </PersonalContext.Provider>
  );
};

export { PersonalContext, PersonalController };
