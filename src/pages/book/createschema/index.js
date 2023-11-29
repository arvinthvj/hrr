import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    subject: yup
      .string()
      .required(global.validationLabel.userManagement.subjectRequird)
      .max(100, 'Maximum characters limit 100.')
      .matches(
        /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
        '^(?!s*$).+ Only these Special characters are allowed',
      )
      .trim(),
    description: yup
      .string()
      .max(150, 'Maximum characters limit 150.')
      .matches(
        /^[0-9A-Za-z]*[?!*$.+()^ ,\\0-9A-Za-z]*$/,
        '^(?!s*$).+ Only these Special characters are allowed',
      )
      .trim(),
  })
  .required();
