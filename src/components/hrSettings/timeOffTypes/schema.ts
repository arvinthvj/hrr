import * as yup from 'yup';
import { global } from '../../../assets/constants/config';
export const timeOffs = yup.object().shape(
  {
    Name: yup
      .string()
      .required('Enter the Name')
      .matches(/^[A-Za-z0-9 ]*$/, 'only alphanumeric accepted')
      .max(50, 'Maximum number of 50 characters exceeded'),
    leaveType: yup.object().required('Choose Leave Type'),
    countryList: yup.object().shape({
      value: yup.string().required('Choose country'),
    }),
    allowance: yup
      .number()
      .typeError('Provide allowance in number of days (0 - 99)')
      .integer('Provide allowance in number of days (0 - 99)')
      .min(0, 'Provide allowance in number of days (0 - 99)')
      .max(99, 'Provide allowance in number of days (0 - 99)')
      .required('Enter the Annual allowance days'),
    roll_forward: yup
      .number()
      .typeError('Provide allowance in number of days (0 - 99)')
      .integer('Provide allowance in number of days (0 - 99)')
      .min(0, 'Provide allowance in number of days (0 - 99)')
      .max(99, 'Provide allowance in number of days (0 - 99)')
      .required('Enter the Roll Forward days'),
    Description: yup.string().when(['Description'], {
      is: exists => exists?.length > 0,
      then: yup
        .string()
        .matches(
          global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
          global.validationLabel.hrModuleValidation
            .vaccinationTypeValidationMesaage,
        )
        .max(300, 'Maximum number of 300 characters exceeded'),
      otherwise: yup.string().notRequired(),
    }),
    date: yup.string().required('Enter the date').nullable(),
  },
  [['Description', 'Description']],
);
