import { ValidationValueMessage } from 'react-hook-form';

export const validationSchema = {
  email: {
    minLength: 6,
    maxLength: 64,
  },

  password: {
    minLength: 3,
    maxLength: 30,
  },
};

export const getRquiredMessage = (feild: string): string => {
  return `${feild} is required.`;
};

export const getMinLengthMessage = (length: number): string => {
  return `minimum ${length} characters required.`;
};

export const requiredValidation = (
  label: string,
): ValidationValueMessage<boolean> => {
  return { value: true, message: getRquiredMessage(label) };
};

export const emailValidation = (v: string): boolean | string => {
  const emailRegx = /^[a-z-0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,7}$/i;
  return emailRegx.test(v) || 'invalid email address.';
};

export const minLengthValidation = (
  length: number,
): ValidationValueMessage<number> => {
  return { value: length, message: getMinLengthMessage(length) };
};
