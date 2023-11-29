import * as yup from 'yup';
import { global } from '../../../assets/constants/config';
export const schema = yup
  .object({
    initialConfiguration: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.tenantValidation.initialConfiguration),
      value: yup
        .string()
        .required(global.validationLabel.tenantValidation.initialConfiguration),
    }),
    tenantName: yup
      .string()
      .required(global.validationLabel.tenantValidation.tenantName)
      .max(global.validationLabel.tenantValidation.tenantNameLength)
      .matches(
        global.validationLabel.tenantValidation.tenantNameValidation,
        global.validationLabel.tenantValidation.youCanOnlyUse,
      )
      .trim(),
    plan: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.tenantValidation.plan),
      value: yup
        .string()
        .required(global.validationLabel.tenantValidation.plan),
    }),
    serverLocations: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.tenantValidation.serverLocations),
      value: yup
        .string()
        .required(global.validationLabel.tenantValidation.serverLocations),
    }),
    loginType: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.tenantValidation.loginType),
      value: yup
        .string()
        .required(global.validationLabel.tenantValidation.loginType),
    }),
    webIdentityProvider: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    mobileIdentityProvider: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    calendarIntegration: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.tenantValidation.calendarIntegration),
      value: yup
        .string()
        .required(global.validationLabel.tenantValidation.calendarIntegration),
    }),
  })
  .required();
