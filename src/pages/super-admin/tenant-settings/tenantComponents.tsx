import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { global } from '../../../assets/constants/config';
import { Modal } from 'react-bootstrap';
import { findLabelText } from '../../../components/commonMethod';
import { TenantLabelText } from '../../../components/tenantComponent/constants';

type emailProps = {
  emailId: string;
  firstName: string;
  lastName: string;
};
type EmailProperty = {
  cancel: CallableFunction | any;
  confirm: CallableFunction;
  show: boolean;
};
export const InviteModal: React.FC<EmailProperty> = ({
  cancel,
  confirm,
  show,
}) => {
  const schema = yup
    .object({
      emailId: yup
        .string()
        .email(global.validationLabel.validEmail)
        .min(6, global.validationLabel.tenantValidation.validEmailLimit)
        .max(255, global.validationLabel.tenantValidation.validEmailLimit)
        .required(global.validationLabel.emailRequired),
      firstName: yup
        .string()
        .required(global.validationLabel.userManagement.firstNameRequird)
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
        .max(30)
        .trim(),
      lastName: yup
        .string()
        .required(global.validationLabel.userManagement.lastNameRequird)
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
        .max(30)
        .trim(),
    })
    .required();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<emailProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit = details => {
    confirm(details);
  };
  return (
    <>
      <Modal show={show} centered className="main-modal">
        <Modal.Header closeButton={false}>
          <Modal.Title>
            {findLabelText(
              TenantLabelText.Invite_the_first_admin,
              TenantLabelText.Invite_the_first_admin,
              TenantLabelText.Common_Values,
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="invite-admin-info">
            <div className="form-group">
              <label>
                {findLabelText(
                  TenantLabelText.First_name,
                  TenantLabelText.Firstname,
                  TenantLabelText.Common_Values,
                )}
              </label>
              <Controller
                name={'firstName'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      value={value}
                      onChange={val => {
                        onChange(val);
                        trigger('firstName');
                      }}
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                    {errors['firstName']?.message ? (
                      <label className="error-message-text-style">
                        {errors['firstName']?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div className="form-group">
              <label>
                {findLabelText(
                  TenantLabelText.Last_Name,
                  TenantLabelText.LastName,
                  TenantLabelText.Common_Values,
                )}
              </label>
              <Controller
                name={'lastName'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      value={value}
                      onChange={val => {
                        onChange(val);
                        trigger('lastName');
                      }}
                      type="text"
                      className="form-control"
                      placeholder=""
                    />
                    {errors['lastName']?.message ? (
                      <label className="error-message-text-style">
                        {errors['lastName']?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div className="form-group">
              <label>
                {findLabelText(
                  TenantLabelText.Tenant_admin,
                  TenantLabelText.Tenant_admin,
                  TenantLabelText.Common_Values,
                )}
              </label>
              <Controller
                name="emailId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <input
                      value={value || ''}
                      onChange={val => {
                        onChange(val);
                        trigger('emailId');
                      }}
                      type="text"
                      className="form-control"
                      placeholder="Email@email.com"
                    />

                    {errors.emailId?.message ? (
                      <label className="error-message-text-style">
                        {errors.emailId?.message}
                      </label>
                    ) : null}
                  </>
                )}
              />
            </div>
            <div className="main-modal-btns">
              <Link to="#" className="btn" onClick={cancel}>
                {findLabelText(
                  TenantLabelText.Cancel,
                  TenantLabelText.Cancel,
                  TenantLabelText.Common_Values,
                )}
              </Link>
              <Link
                to="#"
                className="btn super-admin-btn-primary"
                onClick={handleSubmit(onSubmit)}
              >
                {findLabelText(
                  TenantLabelText.Continue,
                  TenantLabelText.Continue,
                  TenantLabelText.Common_Values,
                )}
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
