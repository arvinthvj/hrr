import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const buildingSchema = yup
  .object({
    locationName: yup
      .string()
      .required(global.validationLabel.location.locationNameRequire)
      .max(global.validationLabel.location.locationNameLength)
      .matches(
        global.validationLabel.location.locationNameValidation,
        global.validationLabel.location.youCanOnlyUse,
      )
      .trim(),
    description: yup
      .string()
      .max(global.validationLabel.location.locationDescriptionLength)
      .matches(
        global.validationLabel.location.locationDescriptionValidation,
        global.validationLabel.location.youCanOnlyUseDescription,
      )
      .trim(),

    language: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.languageRequire),
      value: yup
        .string()
        .required(global.validationLabel.location.languageRequire),
    }),
    currency: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.currencyRequire),
      value: yup
        .string()
        .required(global.validationLabel.location.currencyRequire),
    }),
    parentLocation: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.parentLocationRequire),
      value: yup
        .string()
        .required(global.validationLabel.location.parentLocationRequire),
    }),

    weekstart: yup.object().shape({
      label: yup.string().required(global.validationLabel.location.startWeek),
      value: yup.string().required(global.validationLabel.location.startWeek),
    }),
    timezone: yup.object().shape({
      label: yup
        .string()
        .required(global.validationLabel.location.slectTimezone),
      value: yup
        .string()
        .required(global.validationLabel.location.slectTimezone),
    }),
  })
  .required();
