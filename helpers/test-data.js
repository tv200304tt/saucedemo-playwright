// helpers/test-data.js
import { faker } from '@faker-js/faker';
import { UserType, PASSWORD } from './constants';

// USERS
export const USERS = {
  [UserType.Standard]: { username: 'standard_user', password: PASSWORD },
  [UserType.LockedOut]: { username: 'locked_out_user', password: PASSWORD },
  [UserType.Problem]: { username: 'problem_user', password: PASSWORD },
  [UserType.PerformanceGlitch]: {
    username: 'performance_glitch_user',
    password: PASSWORD,
  },
};

// VALID CHECKOUT
export const VALID_CHECKOUT = {
  firstName: 'John',
  lastName: 'Doe',
  zipCode: '12345',
};

// GENERATE DATA
export function generateCheckoutInfo() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode('#####'),
  };
}

// INVALID CASES
export const INVALID_CHECKOUT_CASES = [
  {
    desc: 'First Name trống',
    data: { firstName: '', lastName: 'Doe', zipCode: '12345' },
    expectedError: 'First Name is required',
  },
  {
    desc: 'Last Name trống',
    data: { firstName: 'John', lastName: '', zipCode: '12345' },
    expectedError: 'Last Name is required',
  },
];