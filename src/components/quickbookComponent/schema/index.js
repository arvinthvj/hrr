import * as yup from 'yup';
import { global } from '../../../assets/constants/config';

export const schema = yup
  .object({
    Comments: yup
      .string()
      .nullable()
      .max(150, 'Maximum characters limit 150')
      .trim(),
  })
  .required();
