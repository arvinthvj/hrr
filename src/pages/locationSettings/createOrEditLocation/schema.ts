import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    locationName: yup
      .string()
      .required(global.validationLabel.location.locationNameRequire)
      .max(global.validationLabel.location.locationNameLength)
      // .matches(
      //   global.validationLabel.location.locationNameValidation,
      //   global.validationLabel.location.youCanOnlyUse
      // )
      .trim(),
    description: yup
      .string()
      .max(global.validationLabel.location.locationDescriptionLength)
      .matches(
        global.validationLabel.location.locationDescriptionValidation,
        global.validationLabel.location.youCanOnlyUseDescription,
      )
      .trim(),
    parentLocation: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.parentLocationRequire),
      value: yup
        .string()
        .required(global.validationLabel.location.parentLocationRequire),
    }),
  })
  .required();
