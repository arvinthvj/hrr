import * as yup from 'yup';
import { global } from '../../assets/constants/config';

export const schema = yup
  .object({
    teamName: yup
      .string()
      .required(global.validationLabel.team.teamNameRequire)
      .max(50,global.validationLabel.teamManagement.maxLimit)
      .matches(
        global.validationLabel.teamManagement.teamNameSplCharRegex,
        global.validationLabel.teamManagement.teamNameSplCharValidationMsg,
      )
      .trim(),
  })
  .required();
