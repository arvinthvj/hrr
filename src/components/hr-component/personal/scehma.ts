import * as yup from 'yup';
import { emailPattern } from '../../../assets/constants/regexpattern';
import { global } from '../../../assets/constants/config';
export const PersonalInfo = yup.object({
  employeeid: yup.string().optional().nullable(),
  title: yup.object().optional(),
  firstname: yup.string().optional().nullable(),
  middlename: yup.string().optional().nullable(),
  lastname: yup.string().optional().nullable(),
  displayname: yup
    .string()
    .optional()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  birthdate: yup.string().optional().nullable(),
  gender: yup.object().optional(),
  maritalstatus: yup.object().optional(),
  pronoun: yup.object().optional(),
  nationality: yup.object().optional(),
  about: yup
    .string()
    .optional()
    .nullable()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300),

  address1: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  address2: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  city: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  state: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  zipcode: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return /^[A-Za-z0-9- ]*$/.test(value);
      },
    ),
  country: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  homephone: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return /^[0-9]+$/.test(value);
      },
    )
    .max(15, global.validationLabel.hrModuleValidation.CharactersExceeded15),
  personalmobile: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return /^[0-9]+$/.test(value);
      },
    )
    .max(15, global.validationLabel.hrModuleValidation.CharactersExceeded15),
  personalemail: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation.EmailValidationMesaage,
      value => {
        if (!value) return true;
        return emailPattern.test(value);
      },
    ),
  homecode: yup.object().shape({
    value: yup.string().optional().nullable(),
  }),
  personalcode: yup.object().shape({
    value: yup.string().optional().nullable(),
  }),
});
export const contact = yup.object().shape(
  {
    firstName: yup
      .string()
      .required('Enter the First Name')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      ),
    lastName: yup
      .string()
      .required('Enter the Last Name')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      ),
    relationship: yup.object().shape({
      value: yup.string().required('Choose Relationship'),
    }),
    countrycode: yup.object().when('ContactNumber', {
      is: ContactNumber => ContactNumber || ContactNumber?.length > 0,
      then: yup.object().shape({
        value: yup.string().required('Country code is required'),
      }),
      otherwise: yup.object().nullable(),
    }),
    ContactNumber: yup.string().when(['ContactNumber', 'Email'], {
      is: (exists, email) => !(email?.length > 0) || !!exists,
      then: yup
        .string()
        .matches(
          /^[0-9]+$/,
          global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
        )
        .max(
          15,
          global.validationLabel.hrModuleValidation.CharactersExceeded15,
        ),
      otherwise: yup.string().nullable(),
    }),
    Email: yup
      .string()
      .email(global.validationLabel.hrModuleValidation.EmailValidationMesaage)
      .nullable(),
  },
  [['ContactNumber', 'ContactNumber']],
);
export const education = yup.object({
  organisation: yup
    .string()
    .required('Enter the Organisation')
    .max(100, global.validationLabel.hrModuleValidation.CharactersExceeded100)
    .matches(
      /^[A-Za-z0-9 ]*$/,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  level: yup
    .string()
    .required('Enter the Level')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      /^[A-Za-z0-9 ]*$/,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  qualification: yup
    .string()
    .required('Enter the Qualification')
    .max(100, global.validationLabel.hrModuleValidation.CharactersExceeded100)
    .matches(
      /^[A-Za-z0-9 ]*$/,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  FromDate: yup.string().required('Enter the date').nullable(),
  ToDate: yup.string().optional().nullable(),
});
export const certifications = yup.object({
  organisation: yup
    .string()
    .required('Enter the Organisation')
    .max(100, global.validationLabel.hrModuleValidation.CharactersExceeded100)
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  level: yup
    .string()
    .required('Enter the Level')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  FieldOfStudy: yup
    .string()
    .required('Enter the Field Of Study')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  FromDate: yup.string().required('Enter the From date').nullable(),
  ToDate: yup.string().optional().nullable(),
});
export const identification = yup.object().shape(
  {
    type: yup
      .string()
      .required('Enter the Type')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      )
      .matches(
        global.validationLabel.hrModuleValidation.alphaNumericalValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      ),
    number: yup
      .string()
      .required('Enter the ID')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      )
      .matches(
        global.validationLabel.hrModuleValidation.alphaNumericalValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      ),
    country: yup.object().shape({
      value: yup.string().required('Choose Country'),
    }),
    ExpiryDate: yup.string().optional().nullable(),
    IssueDate: yup.string().required('Enter the Issue date').nullable(),
    status: yup.string().when(['status'], {
      is: exists => exists?.length > 0,
      then: yup
        .string()
        .max(
          50,
          global.validationLabel.hrModuleValidation
            .vaccinationCharactersExceeded,
        )
        .matches(
          global.validationLabel.hrModuleValidation.alphaNumericalValidation,
          global.validationLabel.hrModuleValidation
            .vaccinationTypeValidationMesaage,
        ),
      otherwise: yup.string().notRequired(),
    }),
  },
  [['status', 'status']],
);
export const clearance = yup.object().shape(
  {
    type: yup
      .string()
      .required('Enter the Type')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      )
      .matches(
        global.validationLabel.hrModuleValidation.alphaNumericalValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      ),
    id_number: yup
      .string()
      .required('Enter the ID Number')
      .max(
        50,
        global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
      )
      .matches(
        global.validationLabel.hrModuleValidation.alphaNumericalValidation,
        global.validationLabel.hrModuleValidation
          .vaccinationTypeValidationMesaage,
      ),
    issue_country: yup
      .object()
      .shape({
        label: yup.string().required('Choose Country'),
        value: yup.string().required('Choose Country'),
      })
      .required('Choose Country'),
    expiry_date: yup.string().optional().nullable(),
    issue_date: yup.string().required('Enter the Issue date').nullable(),
    status: yup.string().when(['status'], {
      is: exists => exists?.length > 0,
      then: yup
        .string()
        .max(
          50,
          global.validationLabel.hrModuleValidation
            .vaccinationCharactersExceeded,
        )
        .matches(
          global.validationLabel.hrModuleValidation.alphaNumericalValidation,
          global.validationLabel.hrModuleValidation
            .vaccinationTypeValidationMesaage,
        ),
      otherwise: yup.string().notRequired(),
    }),
    notes: yup.string().when(['notes'], {
      is: exists => exists?.length > 0,
      then: yup
        .string()
        .required('')
        .max(
          300,
          global.validationLabel.hrModuleValidation.CharactersExceeded300,
        )
        .matches(
          global.validationLabel.hrModuleValidation.alphaNumericalValidation,
          global.validationLabel.hrModuleValidation
            .vaccinationTypeValidationMesaage,
        ),
      otherwise: yup.string().notRequired(),
    }),
  },
  [
    ['status', 'status'],
    ['notes', 'notes'],
  ],
);
export const visa = yup.object({
  type: yup
    .string()
    .required('Enter the Type')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  id_number: yup
    .string()
    .required('Enter the ID Number')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  issue_country: yup
    .object()
    .shape({
      label: yup.string().required('Choose Country'),
      value: yup.string().required('Choose Country'),
    })
    .required('Choose Country'),
  expiry_date: yup.string().optional().nullable(),
  issue_date: yup.string().required('Enter the Issue date').nullable(),
  status: yup
    .string()
    .optional()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.vaccinationTypeValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  notes: yup
    .string()
    .optional()
    .max(300)
    .matches(
      global.validationLabel.hrModuleValidation.visaTypeValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
});
export const vaccinations = yup.object({
  type: yup.string().required('Enter the Type'),
  number: yup.string().required('Enter the Number'),
  Date: yup.string().required('Enter the date').nullable(),
});
export const information = yup.object({
  countrycode1: yup.object().optional().nullable(),
  countrycode2: yup.object().optional().nullable(),
  Status: yup.object().optional().nullable(),
  companyPhone: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return /^\d+$/.test(value);
      },
    )
    .max(15, global.validationLabel.hrModuleValidation.CharactersExceeded15),
  phoneNumber: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return /^\d+$/.test(value);
      },
    )
    .max(15, global.validationLabel.hrModuleValidation.CharactersExceeded15),
  Extension: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isNumeric',
      global.validationLabel.hrModuleValidation.isNumericValidationMesaage,
      value => {
        if (!value) return true;
        return global.validationLabel.hrModuleValidation.isNumericValidation.test(
          value,
        );
      },
    )
    .max(6, 'Maximum number of 6 characters exceeded'),
  Email: yup
    .string()
    .email(global.validationLabel.hrModuleValidation.EmailValidationMesaage)
    .optional()
    .nullable(),
  Grade: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) return true;
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
  Probation: yup.string().optional().nullable(),
  Cost: yup
    .string()
    .optional()
    .nullable()
    .test(
      'isAlphaNumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) return true;
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
  notice: yup
    .string()
    .test('isNumeric', 'Atleast one digit required', value => {
      if (!value) return true;
      return /^(?=.*[0-9])[A-Za-z0-9 ]+$/.test(value);
    })
    .optional()
    .nullable(),
  id: yup.string().optional().nullable(),
  Street: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Suburb: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  City: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  State: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Region: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Country: yup
    .string()
    .optional()
    .nullable()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
});
export const history = yup.object({
  Role: yup
    .string()
    .required('Enter the Job Title')
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Grade: yup
    .string()
    .required('Enter the Role')
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Department: yup
    .string()
    .required('Enter the Role')
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    )
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    ),
  Status: yup.object().shape({
    value: yup.string().required('Choose Status'),
  }),
  start: yup.string().required('Enter the Start date'),
  end: yup.string().optional(),
});
export const compensationBonus = yup.object({
  type: yup.object().shape({
    value: yup.string().required('Choose Type'),
  }),
  Rate: yup
    .string()
    .required('Enter the Rate')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.currencyValidation,
      global.validationLabel.hrModuleValidation.currencyValidationMesaage,
    ),
  reason: yup
    .string()
    .required('Enter the Reason')
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
  date: yup.string().required('Date is Required').nullable(),
  Overtime: yup
    .string()
    .required('Over Time is Required')
    .matches(
      /^[0-9]{1,3}([.,][0-9]{0,2})?$/,
      'Only digits, dot, and comma are allowed',
    ),
});
export const leaveManagement = yup.object({
  type: yup.object().shape({
    value: yup.string().required('Choose type'),
  }),
  From: yup.string().required().nullable(),
  To: yup.string().required().nullable(),
  notes: yup
    .string()
    .notRequired()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
    .test(
      'is-alphanumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) {
          return true;
        }
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
});
export const adjustLeave = yup.object({
  type: yup.object().shape({
    value: yup.string().required('Choose type'),
  }),
  allowance: yup.object().shape({
    value: yup.string().required('Choose allowance'),
  }),
  date: yup.string().required().nullable(),
  Days: yup
    .string()
    .required('Days is Required')
    .max(3, 'Maximum number of 3 characters exceeded')
    .matches(/^[\d]+$/, 'Please provide a number of days (0-999)'),
  notes: yup
    .string()
    .notRequired()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
    .test(
      'is-alphanumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) {
          return true;
        }
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
});
export const hrRequestSchema = yup.object({
  reason: yup
    .string()
    .required('Enter the Reason')
    .test(
      'is-alphanumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) {
          return true;
        }
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
});



export const goalManagement = yup.object({
  title: yup
    .string()
    .required('Enter the title')
    .max(50, global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded)
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
    category: yup
    .object()
    .required('select an option'),
    description: yup
    .string()
    .max(
      50,
      global.validationLabel.hrModuleValidation.vaccinationCharactersExceeded,
    )
    .matches(
      global.validationLabel.hrModuleValidation.alphaNumericalValidation,
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
    ),
    comment: yup
    .string()
    .notRequired()
    .max(300, global.validationLabel.hrModuleValidation.CharactersExceeded300)
    .test(
      'is-alphanumeric',
      global.validationLabel.hrModuleValidation
        .vaccinationTypeValidationMesaage,
      value => {
        if (!value) {
          return true;
        }
        return global.validationLabel.hrModuleValidation.alphaNumericalValidation.test(
          value,
        );
      },
    ),
  targetDate: yup.string().required('Enter the  date').nullable(),
  revisedTargetDate: yup.string().required('Enter the  date').nullable(),
  achievedDate: yup.string().required('Enter the  date').nullable(),
}); 