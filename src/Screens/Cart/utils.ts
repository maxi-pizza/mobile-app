import {PHONE_UA_REGEX} from './constants.ts';

export const isValidUkrainianPhone = (value: string) =>
  PHONE_UA_REGEX.test(value ?? '');
