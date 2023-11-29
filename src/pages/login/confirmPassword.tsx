import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HDPlusLogo } from '../../components/imagepath';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postData } from '../../services/apicall';
import Toaster from '../../components/toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { baseUrl } from '../../assets/constants/pageurl';
import { ProfileUpdatePassword, resetPasswordApi } from '../../services/apiurl';
import { ResetPasswordProps } from '../../assets/globals/typeConstants';
import { LoginLabel } from '../../components/loginComponents/constants';

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const email = new URLSearchParams(search).get('email');
  const password_min_chars = new URLSearchParams(search).get(
    'password_min_char',
  );
  const minCharValidation = parseInt(password_min_chars);
  const data = localStorage.getItem('userDetails');
  const userDetails: string = data ? JSON.parse(data) : '';
  const schema = yup
    .object({
      Password: yup
        .string()
        .required('Password is required')
        .min(minCharValidation)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*¬`"£():;'.,><?/|])/,
          `Must Contain '${password_min_chars}' Characters, One Uppercase, One Number and One Special Character`,
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('Password'), null], 'Confirm Password must be match with Password'),
    })
    .required();

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    resolver: yupResolver(schema),
  });
  const sucessCallBack = (data, res) => {
    dispatch(hideLoader());
    Toaster(res?.data?.code, res?.data?.message);
    console.log(data, res);
    if (res?.data?.code == 200) {
      navigate('/');
    }
    if (res?.data?.message == 'Token Expired,Kindly click Forgot Password') {
      navigate('/');
    }
  };
  const submitForm = async details => {
    dispatch(showLoader());
    const data = {
      token,
      email,
      password: details?.Password,
      password_confirmation: details?.confirmPassword,
    };
    userDetails
      ? postData(ProfileUpdatePassword, data, sucessCallBack)
      : postData(resetPasswordApi, data, sucessCallBack);
  };
  useEffect(() => {
    setValue('Password', '');
    setValue('confirmPassword', '');
  }, []);

  return (
    <>
      <div className="login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="text-center login-logo">
                <Link to="#">
                  <img src={HDPlusLogo} alt="" />
                </Link>
              </div>
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="input-group">
                  <Controller
                    name="Password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <input
                          value={value}
                          onChange={val => {
                            onChange(val);
                            trigger('Password');
                          }}
                          autoComplete="new-password"
                          maxLength={30}
                          className="form-control"
                          type="password"
                          placeholder="New Password"
                        />
                        {errors?.Password?.message ? (
                          <label className="error">
                            {errors?.Password?.message}
                          </label>
                        ) : null}
                      </>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <input
                          value={value}
                          onChange={val => {
                            onChange(val);
                            trigger('confirmPassword');
                          }}
                          maxLength={30}
                          className="form-control"
                          autoComplete="new-password"
                          type="password"
                          placeholder="Repeat New Password"
                        />
                        {errors?.confirmPassword?.message ? (
                          <label className="error">
                            {errors?.confirmPassword?.message}
                          </label>
                        ) : null}
                      </>
                    )}
                  />
                </div>
                <div className="input-group">
                  <button type="submit" className="btn btn-primary">
                    {LoginLabel.Reset_Password}
                  </button>
                </div>
              </form>
              <div className="forgotpass">
                <Link to={baseUrl}>{LoginLabel.Go_back}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPassword;
