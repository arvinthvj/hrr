import * as yup from 'yup';
import { global } from '../../../../assets/constants/config';

export const schema = yup
  .object({
    name: yup
      .string()
      .required(global.validationLabel.assetManagement.name)
      .matches(
        /^[aA-zZ0-9_-\s]+$/,
        'Special characters are not allowed for this field ',
      )
      .max(30)
      .trim(),
    code: yup
      .string()
      .required(global.validationLabel.assetManagement.code)
      .max(30)
      .trim(),
    description: yup
      .string()
      .nullable()
      .required(global.validationLabel.assetManagement.description)
      .trim(),
  })
  .required();

export const assetSchema = yup
  .object({
    name: yup
      .string()
      .required(global.validationLabel.assetManagement.name)
      // .matches(
      //   /^[aA-zZ0-9_-\s]+$/,
      //   "Special characters are not allowed for this field "
      // )
      .max(14, 'Maximum characters limits 14.')
      .trim(),
    description: yup
      .string()
      .nullable()
      .optional()
      // .required(global.validationLabel.assetManagement.description)
      .matches(
        /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
        '^(?!s*$).+ Only these Special characters are allowed',
      )
      .max(299, 'Maximum characters limit 300.')
      .trim(),
  })
  .required();
