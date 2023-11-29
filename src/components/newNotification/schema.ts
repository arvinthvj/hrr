import * as yup from 'yup';
import { global } from '../../assets/constants/config';
import { AlphanumericRegex } from './constants';

export const reasonSchema = yup.object({
  reason: yup
    .string()
    .nullable()
    .matches(AlphanumericRegex, 'Only alphanumeric characters are allowed')
    .max(300, 'Maximum number of characters reached (300)'),
});
