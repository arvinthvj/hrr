import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AdminTenantContext,
  TenantPortal,
} from '../../../components/context/context';
import { LeftAngle } from '../../../components/imagepath';
import SelectField from '../../../components/selectfield/select';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { postData } from '../../../services/apicall';
import {
  SaveTenantDetails,
  TenantAddList,
  TenantDestroy,
  UpdateTenant,
} from '../../../services/apiurl';
import { hideLoader, showLoader } from '../../../reduxStore/appSlice';
import { useDispatch } from 'react-redux';
import Toaster from '../../../components/toast';
import { InviteModal } from './tenantComponents';
import moment from 'moment';
import { DeleteConfirmationModal } from '../../../components/deleteConfirmationModal/DeleteConfirmationModal';
import ValidationModal from './validationmodal';
import { getCommonImageFroms3Bucket } from '../../../services/s3Bucket';
import MaxNo from './maxNo';
import Trial from './trial';
import { SSOCheck, UploadCSV, preparSuccessData } from './uploadCSV';
import {
  TenantLabelText,
  tenantText,
} from '../../../components/tenantComponent/constants';
import { findLabelText } from '../../../components/commonMethod';
import { dateFormat_YYYY_MM_DD } from '../../../assets/constants/config';

export const CreateSidebar = ({
  createhandleClick,
  saveSuccess,
  editDetails,
  removeSuccess,
  userPermissionCheck,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { allConfigurations } = useContext(AdminTenantContext);
  const [initialConfiguration, setInitialConfiguration] = useState([]);
  const [planList, setPlanList] = useState([]);
  const [serverLocationList, setServerLocationList] = useState([]);
  const [loginTypeList, setLoginTypeList] = useState([]);
  const [webIdentityProviderList, setWebIdentityProvider] = useState([]);
  const [mobileIdentityProviderList, setMobileWebIdentityProvider] = useState(
    [],
  );
  const [calendarList, setCalendarList] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isTrial, setIsTrial] = useState(true);
  const [isSSOLoginAudit, setIsSSOLoginAudit] = useState(true);
  const [isSubscriptionAutoRenew, setSubscriptionRenew] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<any>({});
  const [maxNoOfAssets, setMaxNoOfAssets] = useState(1000);
  const [maxNoOfWorkSpace, setMaxNoOfWorkSpace] = useState(1000);
  const [maxNoOfRooms, setMaxNoOfRooms] = useState(1000);
  const [maxNoOfParking, setMaxNoOfParking] = useState(1000);
  const [maxNoOfUser, setMaxNoOfUser] = useState(1000);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 14)),
  );
  const [tenantId, setTenantId] = useState(null);
  const [permissionType, setPermissionType] = useState(true);
  const [type, setType] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showValidationModalFlag, setShowValidationModalFlag] = useState(false);
  const [validationDetails, setValidationDetails] = useState({});
  const [csvTemplate, setCsvTemplate] = useState('');
  useEffect(() => {
    getTenantList();
  }, []);
  useEffect(() => {
    if (editDetails?.tenant_id) {
      setPermissionType(checkData());
    }
  }, [type]);
  const getTenantList = () => {
    postData(TenantAddList, '', data => {});
  };
  const addLabelAndValueKey = arr => {
    const list: any = [];
    for (const obj of arr) {
      obj['value'] = obj.id;
      obj['label'] = obj.name;
      list.push(obj);
    }
    return list;
  };
  const addLabelAndValueKeyInObj = obj => {
    if (obj?.id) {
      obj['value'] = obj.id;
      obj['label'] = obj?.name ? obj?.name : '';
      return obj;
    } else {
      return {};
    }
  };
  const setInitialValues = () => {
    if (allConfigurations?.initial_configurations?.length > 0) {
      const list = addLabelAndValueKey(
        allConfigurations?.initial_configurations,
      );
      setValue(formKeys.initialConfiguration, list[0]);
      setInitialConfiguration(list);
    } else {
      setInitialConfiguration([]);
    }
    setValue(formKeys.tenantName, '');
    if (allConfigurations?.plan_types?.length > 0) {
      const list = addLabelAndValueKey(allConfigurations?.plan_types);
      setValue(formKeys.plan, list[0]);
      setPlanList(list);
    } else {
      setPlanList([]);
    }
    if (allConfigurations?.server_locations?.length > 0) {
      const list = addLabelAndValueKey(allConfigurations?.server_locations);
      setValue(formKeys.serverLocations, list[0]);
      setServerLocationList(list);
    } else {
      setServerLocationList([]);
    }
    if (allConfigurations?.login_types?.length > 0) {
      const list = addLabelAndValueKey(allConfigurations?.login_types);
      setValue(formKeys.loginType, list[0]);
      setSelectedLoginType(list[0]);
      setLoginTypeList(list);
    } else {
      setLoginTypeList([]);
    }
    if (allConfigurations?.identity_providers?.length > 0) {
      const web: any = [];
      const mobile: any = [];
      for (const obj of allConfigurations?.identity_providers) {
        if (obj.type == 'web') {
          web.push(obj);
        } else if (obj.type == 'mobile') {
          mobile.push(obj);
        }
      }
      const webList = addLabelAndValueKey(web);
      const mobList = addLabelAndValueKey(web);
      setValue(formKeys.webIdentityProvider, webList[0]);
      setWebIdentityProvider(webList);
      setValue(formKeys.mobileIdentityProvider, mobList[0]);
      setMobileWebIdentityProvider(mobList);
    } else {
      setMobileWebIdentityProvider([]);
      setWebIdentityProvider([]);
    }
    if (allConfigurations?.calendar_integrations?.length > 0) {
      const list = addLabelAndValueKey(
        allConfigurations?.calendar_integrations,
      );
      setValue(formKeys.calendarIntegration, list[0]);
      setCalendarList(list);
    } else {
      setCalendarList([]);
    }
  };
  useEffect(() => {
    setInitialValues();
  }, []);
  useEffect(() => {
    setEditDetails();
    clearErrors();
  }, [editDetails]);
  const setEditDetails = () => {
    if (
      editDetails != undefined &&
      editDetails &&
      Object.keys(editDetails)?.length > 0
    ) {
      setValue(
        formKeys.initialConfiguration,
        addLabelAndValueKeyInObj(editDetails?.initial_config),
      );
      setValue(formKeys.tenantName, editDetails?.name);
      setValue(formKeys.lastName, editDetails?.last_name);
      setValue(formKeys.plan, addLabelAndValueKeyInObj(editDetails?.plan));
      setValue(
        formKeys.serverLocations,
        addLabelAndValueKeyInObj(editDetails?.server_location),
      );
      setValue(
        formKeys.loginType,
        addLabelAndValueKeyInObj(editDetails?.login_type),
      );
      setValue(
        formKeys.webIdentityProvider,
        addLabelAndValueKeyInObj(editDetails?.web_identity_provider),
      );
      setValue(
        formKeys.mobileIdentityProvider,
        addLabelAndValueKeyInObj(editDetails?.mobile_identity_provider),
      );
      setValue(
        formKeys.calendarIntegration,
        addLabelAndValueKeyInObj(editDetails?.calendar_integration),
      );
      setIsActive(editDetails?.status == '1' ? true : false);
      setIsTrial(editDetails?.trial == '1' ? true : false);
      setIsSSOLoginAudit(editDetails?.aduit_enable == '1' ? true : false);
      setSubscriptionRenew(editDetails?.auto_renew == '1' ? true : false);
      setSelectedLoginType(addLabelAndValueKeyInObj(editDetails?.login_type));
      setMaxNoOfAssets(editDetails?.max_asset);
      setMaxNoOfParking(
        editDetails?.no_of_parking !== null ? editDetails?.no_of_parking : 0,
      );
      setMaxNoOfRooms(
        editDetails?.no_of_rooms !== null ? editDetails?.no_of_rooms : 0,
      );
      setMaxNoOfWorkSpace(
        editDetails?.no_of_workspaces !== null
          ? editDetails?.no_of_workspaces
          : 0,
      );
      setMaxNoOfUser(editDetails?.max_user);
      setTenantId(editDetails?.tenant_id);
      setStartDate(new Date(editDetails?.start_date));
      setEndDate(new Date(editDetails?.end_date));
      setType(!type);
    } else {
      setInitialValues();
      setIsActive(true);
      setIsTrial(true);
      setIsSSOLoginAudit(true);
      setSubscriptionRenew(false);
      setMaxNoOfAssets(0);
      setMaxNoOfParking(0);
      setMaxNoOfRooms(0);
      setMaxNoOfWorkSpace(0);
      setMaxNoOfUser(0);
      setTenantId(null);
      setStartDate(new Date());
      setEndDate(new Date(new Date().setDate(new Date().getDate() + 14)));
    }
  };
  const formKeys = {
    initialConfiguration: 'initialConfiguration',
    tenantName: 'tenantName',
    firstName: 'firstName',
    lastName: 'lastName',
    plan: 'plan',
    serverLocations: 'serverLocations',
    loginType: 'loginType',
    webIdentityProvider: 'webIdentityProvider',
    mobileIdentityProvider: 'mobileIdentityProvider',
    calendarIntegration: 'calendarIntegration',
  };
  const onUpdateTenantDetails = details => {
    onSubmitTenantDetails(details, '');
  };
  const deleteTenantDetails = () => {
    const list = {
      tenant_id: tenantId,
    };
    dispatch(showLoader());
    postData(TenantDestroy, list, (success, res) => {
      dispatch(hideLoader());
      Toaster(res.data.code, res.data.message);
      if (res.data.code == '200') {
        removeSuccess(tenantId);
      }
    });
  };
  const onSubmitTenantDetails = (details, modelData) => {
    const data = {
      name: details.tenantName,
      organisation: details.tenantName,
      first_name: modelData.firstName,
      last_name: modelData.lastName,
      initial_config: details.initialConfiguration.id,
      status: isActive ? '1' : '0',
      plan: details.plan.id,
      trial: isTrial ? '1' : '0', // trial
      start_date: startDate,
      end_date: endDate,
      auto_renew: isSubscriptionAutoRenew ? '1' : '0',
      max_asset: maxNoOfAssets,
      no_of_workspaces: maxNoOfWorkSpace,
      no_of_parking: maxNoOfParking,
      no_of_rooms: maxNoOfRooms,
      max_user: maxNoOfUser,
      server_location: details.serverLocations.id,
      login_type: details.loginType.id,
      web_identity_provider:
        selectedLoginType?.name == 'SSO' ? details.webIdentityProvider.id : '',
      mobile_identity_provider:
        selectedLoginType?.name == 'SSO'
          ? details.mobileIdentityProvider.id
          : '',
      aduit_enable:
        selectedLoginType?.name == 'SSO' ? (isSSOLoginAudit ? '1' : '0') : '',
      calendar_integration: details.calendarIntegration.id,
    };
    if (modelData?.emailId) {
      data['tenant_email'] = modelData?.emailId;
    }
    if (tenantId) {
      data['tenant_id'] = tenantId;
    }
    setShowModal(false);
    dispatch(showLoader());
    postData(
      tenantId ? UpdateTenant : SaveTenantDetails,
      data,
      (success, res) => {
        dispatch(hideLoader());
        Toaster(res.data.code, res.data.message);
        if (res.data.code == '200') {
          if (tenantId) {
            setType(!type);
          }
          saveSuccess(
            preparSuccessData(
              success,
              details,
              startDate,
              endDate,
              selectedLoginType,
            ),
          );
        }
      },
    );
  };
  const invalidTenantDetails = details => {};
  function checkData() {
    if (userPermissionCheck) {
      return false;
    } else {
      return new Date(moment(new Date()).format(dateFormat_YYYY_MM_DD)) >
        new Date(moment(new Date(endDate)).format(dateFormat_YYYY_MM_DD))
        ? true
        : false;
    }
  }
  useEffect(() => {
    getCommonImageFroms3Bucket(
      'User-BulkUpload-CSV-Template.csv',
      'template/csv',
      data => {
        setCsvTemplate(data);
      },
    );
  }, []);
  return (
    <>
      <TenantPortal.Provider
        value={{
          maxNoOfWorkSpace: maxNoOfWorkSpace,
          setMaxNoOfWorkSpace: setMaxNoOfWorkSpace,
          maxNoOfRooms: maxNoOfRooms,
          setMaxNoOfRooms: setMaxNoOfRooms,
          maxNoOfParking: maxNoOfParking,
          setMaxNoOfParking: setMaxNoOfParking,
          maxNoOfUser: maxNoOfUser,
          setMaxNoOfUser: setMaxNoOfUser,
          setIsTrial: setIsTrial,
          setStartDate: setStartDate,
          setEndDate: setEndDate,
          isTrial: isTrial,
          startDate: startDate,
          endDate: endDate,
          setSubscriptionRenew: setSubscriptionRenew,
          isSubscriptionAutoRenew: isSubscriptionAutoRenew,
        }}
      >
        <div
          className={
            'col-xl-3 col-sm-12 main-space-remove-left book-right-card-team super-admin-space-remove list-manage-teams user-list-man'
          }
        >
          <div className="card super-admin-settings-card tenant-card-right w-100">
            <div className="settings-sidebar-header">
              <div className="settings-inner-header">
                <h2>
                  <Link
                    to="#"
                    className="create-close-sidebar"
                    onClick={createhandleClick}
                  >
                    <img src={LeftAngle} alt="img" />
                  </Link>{' '}
                  {tenantId
                    ? tenantText.Edit_tenant
                    : tenantText.Create_new_tenant}
                </h2>
              </div>
              <div className="super-admin-settings-btn">
                {tenantId ? (
                  <button
                    className="btn super-admin-btn-primary"
                    onClick={handleSubmit(
                      onUpdateTenantDetails,
                      invalidTenantDetails,
                    )}
                  >
                    {findLabelText(
                      TenantLabelText.Save_changes,
                      TenantLabelText.Save_changes,
                      TenantLabelText.Common_Values,
                    )}
                  </button>
                ) : (
                  <button
                    data-bs-toggle={'modal'}
                    id="save_tenant"
                    className="btn super-admin-btn-primary"
                    onClick={handleSubmit(() => setShowModal(true))}
                  >
                    {findLabelText(
                      TenantLabelText.Save,
                      TenantLabelText.Save,
                      TenantLabelText.Common_Values,
                    )}
                  </button>
                )}

                <Link
                  to="#"
                  className="btn create-close-sidebar"
                  onClick={createhandleClick}
                >
                  {findLabelText(
                    TenantLabelText.Cancel,
                    TenantLabelText.Cancel,
                    TenantLabelText.Common_Values,
                  )}
                </Link>
              </div>

              {tenantId ? null : (
                <div className="form-group settings-select initial-configuration-select">
                  <label>
                    {findLabelText(
                      TenantLabelText.Initial_configuration,
                      TenantLabelText.Initial_configuration,
                      TenantLabelText.Common_Values,
                    )}
                  </label>
                  <Controller
                    name={formKeys.initialConfiguration}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <>
                        <SelectField
                          bgColor={'#FFFFFF'}
                          value={initialConfiguration?.filter(
                            (option: any) => option?.id == value?.id,
                          )}
                          options={initialConfiguration}
                          height={'40px'}
                          onChangeValue={val => {
                            onChange(val);
                            trigger(formKeys.initialConfiguration);
                          }}
                          placeholder="please select Initial configuration"
                        />
                        {errors[formKeys.initialConfiguration]?.value
                          ?.message ? (
                          <label className="error-message-text-style">
                            {
                              errors[formKeys.initialConfiguration]?.value
                                ?.message
                            }
                          </label>
                        ) : null}
                      </>
                    )}
                  />
                </div>
              )}
            </div>
            <div className="card-body super-admin-settings-card-body">
              <UploadCSV
                isActive={isActive}
                setIsActive={setIsActive}
                tenantId={tenantId}
                editDetails={editDetails}
                csvTemplate={csvTemplate}
                setValidationDetails={setValidationDetails}
                setShowValidationModalFlag={setShowValidationModalFlag}
              />
              <div className="form-group">
                <label>
                  {findLabelText(
                    TenantLabelText.Tenant_name,
                    TenantLabelText.Tenant_name,
                    TenantLabelText.Common_Values,
                  )}
                </label>
                <Controller
                  name={formKeys.tenantName}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <input
                        value={value ? value : ''}
                        onChange={val => {
                          onChange(val);
                          trigger(formKeys.tenantName);
                        }}
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                      {errors[formKeys.tenantName]?.message ? (
                        <label className="error-message-text-style">
                          {errors[formKeys.tenantName]?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              <div className="form-group settings-select">
                <label>
                  {findLabelText(
                    TenantLabelText.Plan,
                    TenantLabelText.Plan,
                    TenantLabelText.Common_Values,
                  )}
                </label>

                <Controller
                  name={formKeys.plan}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <SelectField
                        bgColor={'#FFFFFF'}
                        value={planList?.filter(
                          (option: any) => option?.id == value?.id,
                        )}
                        options={planList}
                        height={'40px'}
                        onChangeValue={val => {
                          onChange(val);
                          trigger(formKeys.plan);
                        }}
                        placeholder="please select Initial configuration"
                      />
                      {errors[formKeys.plan]?.value?.message ? (
                        <label className="error-message-text-style">
                          {errors[formKeys.plan]?.value?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              <Trial />
              <MaxNo />
              <div className="form-group number-form-group">
                <label className="settings-radio-label">
                  {findLabelText(
                    TenantLabelText.Server_location,
                    TenantLabelText.Server_location,
                    TenantLabelText.Common_Values,
                  )}
                  <span className="token-hours">
                    {findLabelText(
                      TenantLabelText.later_date,
                      TenantLabelText.later_date,
                      TenantLabelText.Common_Values,
                    )}
                  </span>
                </label>
                <Controller
                  name={formKeys.serverLocations}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <SelectField
                        bgColor={'#FFFFFF'}
                        value={serverLocationList?.filter(
                          (option: any) => option?.id == value?.id,
                        )}
                        options={serverLocationList}
                        height={'40px'}
                        onChangeValue={val => {
                          onChange(val);
                          trigger(formKeys.serverLocations);
                        }}
                        placeholder="please select Initial configuration"
                      />
                      {errors[formKeys.serverLocations]?.value?.message ? (
                        <label className="error-message-text-style">
                          {errors[formKeys.serverLocations]?.value?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              <div className="form-group settings-select">
                <label>
                  {findLabelText(
                    TenantLabelText.Type_of_login,
                    TenantLabelText.Type_of_login,
                    TenantLabelText.Common_Values,
                  )}
                </label>
                <Controller
                  name={formKeys.loginType}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <SelectField
                        bgColor={'#FFFFFF'}
                        value={loginTypeList?.filter(
                          (option: any) => option?.id == value?.id,
                        )}
                        options={loginTypeList}
                        height={'40px'}
                        onChangeValue={val => {
                          onChange(val);
                          trigger(formKeys.loginType);
                          setSelectedLoginType(val);
                        }}
                        placeholder="please select Initial configuration"
                      />
                      {errors[formKeys.loginType]?.value?.message ? (
                        <label className="error-message-text-style">
                          {errors[formKeys.loginType]?.value?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              {selectedLoginType && selectedLoginType?.name == 'SSO' ? (
                <>
                  <div className="form-group settings-select">
                    <label>
                      {findLabelText(
                        TenantLabelText.Web_identity_provider,
                        TenantLabelText.Web_identity_provider,
                        TenantLabelText.Common_Values,
                      )}
                    </label>
                    <Controller
                      name={formKeys.webIdentityProvider}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <SelectField
                            bgColor={'#FFFFFF'}
                            value={webIdentityProviderList?.filter(
                              (option: any) => option?.id == value?.id,
                            )}
                            options={webIdentityProviderList}
                            height={'40px'}
                            onChangeValue={val => {
                              onChange(val);
                              trigger(formKeys.webIdentityProvider);
                            }}
                            placeholder="please select Initial configuration"
                          />
                          {errors[formKeys.webIdentityProvider]?.value
                            ?.message ? (
                            <label className="error-message-text-style">
                              {
                                errors[formKeys.webIdentityProvider]?.value
                                  ?.message
                              }
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div className="form-group settings-select">
                    <label>
                      {findLabelText(
                        TenantLabelText.Mobile_identity_provider,
                        TenantLabelText.Mobile_identity_provider,
                        TenantLabelText.Common_Values,
                      )}
                    </label>
                    <Controller
                      name={formKeys.mobileIdentityProvider}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <SelectField
                            bgColor={'#FFFFFF'}
                            value={mobileIdentityProviderList?.filter(
                              (option: any) => option?.id == value?.id,
                            )}
                            options={mobileIdentityProviderList}
                            height={'40px'}
                            onChangeValue={val => {
                              onChange(val);
                              trigger(formKeys.mobileIdentityProvider);
                            }}
                            placeholder="please select Initial configuration"
                          />
                          {errors[formKeys.mobileIdentityProvider]?.value
                            ?.message ? (
                            <label className="error-message-text-style">
                              {
                                errors[formKeys.mobileIdentityProvider]?.value
                                  ?.message
                              }
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <SSOCheck
                    setIsSSOLoginAudit={setIsSSOLoginAudit}
                    isSSOLoginAudit={isSSOLoginAudit}
                  />
                </>
              ) : null}
              <div className="form-group settings-select">
                <label>
                  {findLabelText(
                    TenantLabelText.Calendar_integration,
                    TenantLabelText.Calendar_integration,
                    TenantLabelText.Common_Values,
                  )}
                </label>
                <Controller
                  name={formKeys.calendarIntegration}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <SelectField
                        bgColor={'#FFFFFF'}
                        value={calendarList?.filter(
                          (option: any) => option?.id == value?.id,
                        )}
                        options={calendarList}
                        height={'40px'}
                        onChangeValue={val => {
                          onChange(val);
                          trigger(formKeys.calendarIntegration);
                        }}
                        placeholder="please select Initial configuration"
                      />
                      {errors[formKeys.calendarIntegration]?.value?.message ? (
                        <label className="error-message-text-style">
                          {errors[formKeys.calendarIntegration]?.value?.message}
                        </label>
                      ) : null}
                    </>
                  )}
                />
              </div>
              {tenantId ? (
                <div className="form-group">
                  <div className="super-admin-remove-btn delete-tenant-btn">
                    <p>
                      {findLabelText(
                        TenantLabelText.deleteTenant,
                        TenantLabelText.deleteTenant,
                        TenantLabelText.Common_Values,
                      )}
                    </p>
                    <Link
                      className={permissionType ? 'btn enable' : 'btn disable'}
                      to={'#'}
                      data-bs-toggle={permissionType ? 'modal' : ''}
                      data-bs-target={permissionType ? '#delete-modal' : ''}
                    >
                      {findLabelText(
                        TenantLabelText.Delete_tenant,
                        TenantLabelText.Delete_tenant,
                        TenantLabelText.Common_Values,
                      )}
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </TenantPortal.Provider>
      <InviteModal
        cancel={() => {
          setShowModal(false);
        }}
        confirm={modelData => {
          onSubmitTenantDetails(getValues(), modelData);
        }}
        show={showModal}
      />
      {/* <DeleteConfirmationModal
        cancel={() => {}}
        confirm={() => {
          deleteTenantDetails();
        }}
        header={findLabelText(
          TenantLabelText.Delete_tenant,
          TenantLabelText.Delete_tenant,
          TenantLabelText.Common_Values
        )}
        content={findLabelText(
          TenantLabelText.DeleteContent,
          TenantLabelText.DeleteContent,
          TenantLabelText.Common_Values
        )}
      /> */}
      <ValidationModal
        close={() => {
          setShowValidationModalFlag(false);
        }}
        showValidationModal={showValidationModalFlag}
        details={validationDetails}
      />
    </>
  );
};

export default CreateSidebar;
