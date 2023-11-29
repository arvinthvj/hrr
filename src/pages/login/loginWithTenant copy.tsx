import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
import { useDispatch } from 'react-redux';
import { postData } from '../../services/apicall';
import {
  hideLoader,
  setTenantDetails,
  showLoader,
} from '../../reduxStore/appSlice';
import Toaster from '../../components/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { global } from '../../assets/constants/config';
import { tenantLoginUrl } from '../../services/apiurl';
import { loginUrl } from '../../assets/constants/pageurl';
import { LoginLabel } from '../../components/loginComponents/constants';
type TenantProps = {
  organisation: string;
};
type PrepareDataProps = {
  org_name: string;
};
const schema = yup
  .object({
    organisation: yup.string().required(global.validationLabel.organisationReq),
  })
  .required();
const LoginWithTenant: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm<TenantProps>({
    resolver: yupResolver(schema),
  });
  const submitForm = async details => {
    const preparData = {
      org_name: details?.organisation,
    };
    doLogin(preparData, false);
  };
  useEffect(() => {
    dispatch(setTenantDetails([]));
  }, []);
  const doLogin = async (preparData: PrepareDataProps, isSSOLogin) => {
    dispatch(showLoader());
    try {
      postData(tenantLoginUrl, preparData, (data, res) => {
        if (res?.data?.data) {
          if (res.data?.code == '200') {
            if (data.length > 0) {
              dispatch(setTenantDetails(data));
              navigate(loginUrl);
            } else {
              Toaster(res?.data?.code, res?.data?.message);
            }
          } else {
            Toaster(res?.data?.code, res?.data?.message);
          }
          dispatch(hideLoader());
        } else {
          Toaster(res?.data?.code, res?.data?.message);
          dispatch(hideLoader());
        }
      });
    } catch {
      dispatch(hideLoader());
    }
  };
  const onNameChange = async (value, fieldName) => {
    const valid = await trigger(fieldName);
  };
  const handleNavigate = () => {
    navigate('/account/createaccount');
  };
  return (
    <>
      <div className="cardContainer-for-account">
        <div className="tenant-login-need-account-text">
          <span>{LoginLabel.Need_account}</span>
        </div>
        <button className="btn-outline-tenant-login" onClick={handleNavigate}>
          {LoginLabel.Start_today}
        </button>
      </div>
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
                  <span>{LoginLabel.Log_account}</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="input-group addres-group">
                    <Controller
                      name="organisation"
                      control={control}
                      render={({ field: { value, onChange, ...field } }) => (
                        <>
                          <input
                            {...field}
                            value={value || ''}
                            onChange={({ target: { value } }) => {
                              onChange(value);
                              onNameChange(value, 'organisation');
                            }}
                            className="form-control"
                            type="text"
                            placeholder="Organisation"
                          />
                          {errors?.organisation?.message ? (
                            <label className="error">
                              {errors?.organisation?.message}
                            </label>
                          ) : null}
                        </>
                      )}
                    />
                  </div>
                  <div className="input-group">
                    <button type="submit" className="btn btn-primary">
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

export default LoginWithTenant;
