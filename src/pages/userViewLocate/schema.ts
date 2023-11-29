import * as yup from 'yup';
import { global } from '../../assets/constants/config';

export const schema = yup
  .object({
    subject: yup
      .string()
      .required(global.validationLabel.userManagement.subjectRequird)
      .max(100, global.validationLabel.book.maxLimit100)
      .matches(
        global.validationLabel.book.splCharRegex,
        global.validationLabel.book.splCharValidationMsg,
      )
      .trim(),
    comments: yup
      .string()
      .max(150, global.validationLabel.book.maxLimit150)
      .matches(
        global.validationLabel.book.splCharRegex,
        global.validationLabel.book.splCharValidationMsg,
      )
      .trim(),
  })
  .required();
