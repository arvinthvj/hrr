import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAwsData,
  setTenantDetails,
  setTenantList,
} from '../../reduxStore/appSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { global } from '../../assets/constants/config';
import { LoginLabel } from '../../components/loginComponents/constants';
import DropDownSelection from '../../components/selectfield/dropDownSelection';
import { handleFederatedSignIn } from './authUtils';
type AccessLevel = {
  id: number | string;
  value: string;
};
type TenantProps = {
  tenent: AccessLevel;
};
type PrepareDataProps = {
  org_name: string;
};
const schema = yup
  .object({
    tenent: yup.object().shape({
      label: yup.string().required(global.validationLabel.location.tenantList),
      value: yup.string().required(global.validationLabel.location.tenantList),
    }),
  })
  .required();
const SelectTenant: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoginEmail, AwsData } = useSelector((state: any) => {
    return state.app;
  });
  const [options, setOptions] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<TenantProps>({
    resolver: yupResolver(schema),
  });
  const submitForm = async details => {
    dispatch(setTenantList(selectedValue));
    dispatch(setTenantDetails([selectedValue]));
    dispatch(getAwsData(AwsData));
    handleFederatedSignIn(selectedValue, navigate);
  };
  const [selectedValue, setSelectedValue] = useState<any>({});
  useEffect(() => {
    const newArray = userLoginEmail?.tenants?.map(item => {
      return { ...item, value: item.tenant_id, label: item.tenant_name };
    });
    setOptions(newArray);
    dispatch(setTenantDetails([]));
    dispatch(setTenantList(''));
  }, []);
  return (
    <>
      <div className="login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="login-set">
              <div className="loginbox">
                <div className="text-center login-logo">
                  <Link to="#">
                    <img src={HDPlusLogo} alt="logo" height={102} width={109} />
                  </Link>
                </div>
                <div className="tenantLoginLabel">
                  <span>{LoginLabel.organization}</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="input-group addres-group">
                    <Controller
                      name="tenent"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <>
                          <DropDownSelection
                            options={options}
                            minWidth="100px"
                            height="35px"
                            backgroundColor="#FFF"
                            onChange={value => {
                              onChange(value);
                              trigger('tenent');
                              setSelectedValue(value);
                            }}
                            placeholder="Please select..."
                          />
                          {errors?.tenent?.value?.message ? (
                            <label className="error">
                              {errors?.tenent?.value?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div className="input-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      {LoginLabel.Continue}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTenant;
