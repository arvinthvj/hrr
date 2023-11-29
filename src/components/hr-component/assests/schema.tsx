import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const assetsSchema = yup.object({
  category: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation
        .requiredCategoryValidationMessage,
    )
    .max(150, global.validationLabel.hrModuleValidation.maxLengthCategory)
    .trim(),
  description: yup
    .string()
    .optional()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
    .trim(),
  serial_no: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  cost: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  notes: yup
    .string()
    .optional()
    .nullable()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300),
  returned_date: yup.string().optional().nullable(),
  loaned_date: yup
    .string()
    .required(
      global.validationLabel.hrModuleValidation.requiredLoanedDateMessage,
    ),
});
