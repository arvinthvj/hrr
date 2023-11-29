import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    description: yup
      .string()
      .nullable()
      .matches(
        global.validationLabel.profileSettingValidation
          .profiledescrptionValidation,
        global.validationLabel.profileSettingValidation.youCanOnlyUse,
      )
      .trim(),
  })
  .required();
