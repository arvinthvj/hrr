import * as yup from 'yup';
export const schema = yup
  .object({
    subject: yup
      .string()
      .required('Please add you subject')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(30)
      .trim(),
    comments: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .max(30)
      .trim(),
  })
  .required();
