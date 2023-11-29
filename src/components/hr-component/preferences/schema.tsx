import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    language: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.languageRequire),
      value: yup
        .string()
        .required(global.validationLabel.location.languageRequire),
    }),
  })
  .required();

export const defaultPrefernceData = yup.object({
  location: yup.object().shape({
    label: yup.string().required('please select location'),
    value: yup.string().required('please select location'),
  }),
  workspace: yup.object().shape({
    label: yup.string().required('please select workspace'),
    value: yup.string().required('please select workspace'),
  }),
});
