import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    email: yup
      .string()
      .required(global.validationLabel.emailRequired)
      .email(global.validationLabel.validEmail)
      .min(6, global.validationLabel.userManagement.validEmailLimit)
      .max(255, global.validationLabel.userManagement.validEmailLimit)
      .trim(),
    password: yup
      .string()
      .required(global.validationLabel.passwordRequired)
      .min(global.common.minPasswordLength)
      .max(global.common.maxPasswordLength)
      .trim(),
  })
  .required();
