import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    firstName: yup
      .string()
      .required(global.validationLabel.userManagement.firstNameRequird)
      // .matches(/^\p{L}+$/u, "Only alphabets are allowed for this field ")
      .max(30)
      .trim(),
    lastName: yup
      .string()
      .required(global.validationLabel.userManagement.lastNameRequird)
      // .matches(/^\p{L}+$/u, "Only alphabets are allowed for this field ")
      .max(30)
      .trim(),
    displayName: yup
      .string()
      .required(global.validationLabel.userManagement.displayNameRequird)
      // .matches(/^\p{L}+$/u, "Only alphabets are allowed for this field ")
      .max(30)
      .trim(),
    email: yup
      .string()
      .required(global.validationLabel.userManagement.emailRequired)
      .email(global.validationLabel.userManagement.validEmail)
      .min(6, global.validationLabel.userManagement.validEmailLimit)
      .max(255, global.validationLabel.userManagement.validEmailLimit)
      .trim(),
  })
  .required();

export const emailschema = yup

  .object({
    email: yup
      .string()
      .required(
        global.validationLabel.userManagement.emailRequired,
        global.validationLabel.userManagement.validEmailLimit,
      )
      .email(global.validationLabel.userManagement.validEmail)
      .min(6, global.validationLabel.userManagement.validEmailLimit)
      .max(255, global.validationLabel.userManagement.validEmailLimit)
      .trim(),
    name: yup
      .string()
      .required(global.validationLabel.userManagement.firstNameRequird)
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(30)
      .trim(),
    access_Level: yup
      .object()
      // .required(global.validationLabel.location.startWeek)
      .shape({
        label: yup
          .string()
          .required(global.validationLabel.location.accessLevel),
        value: yup
          .string()
          .required(global.validationLabel.location.accessLevel),
      }),
  })
  .required();
