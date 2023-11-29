import * as yup from 'yup';
import { global } from '../../../assets/constants/config';
const emailRegex = /^[a-zA-Z0-9@.]*$/;

export const benefitSchema = yup.object({
  name: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation
        .requiredBenefitValidationMessage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .trim(),
  email: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation.EmailValidationMesaage,
      value => {
        if (!value) return true;
        return emailRegex.test(value);
      },
    ),
  comment: yup
    .string()
    .optional()
    .nullable()
    .max(300, global.validationLabel.hrModuleValidation.maxLenDec),
  link: yup.string().optional().nullable(),
});

export const pensionSchema = yup.object({
  provider: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation
        .requiredBenefitValidationMessage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .trim(),
  id_number: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation.requiredIDValidationMessage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .trim(),
  employee_pays: yup
    .string()
    .required(global.validationLabel.hrModuleValidation.requiredEmployeePay)
    .matches(/^[0-9]/, 'only number accepted')
    .min(
      1,
      global.validationLabel.hrModuleValidation.percentageLengthValidation,
    )
    .max(
      5,
      global.validationLabel.hrModuleValidation.percentageLengthValidation,
    ),
  company_pays: yup
    .string()
    .required(global.validationLabel.hrModuleValidation.requiredCompanyPay)
    .matches(/^[0-9]/, 'only number accepted')
    .min(
      1,
      global.validationLabel.hrModuleValidation.percentageLengthValidation,
    )
    .max(
      5,
      global.validationLabel.hrModuleValidation.percentageLengthValidation,
    ),
  link: yup
    .string()
    .required(global.validationLabel.hrModuleValidation.requiredLink),
  effective_from: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation.requiredEffectiveDateMessage,
    ),
});
