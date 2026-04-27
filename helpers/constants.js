export const UserType = {
  Standard: 'standard_user',
  LockedOut: 'locked_out_user',
  Problem: 'problem_user',
  PerformanceGlitch: 'performance_glitch_user',
};
export const SortOption = {
  NameAZ: 'az',
  NameZA: 'za',
  PriceLowHigh: 'lohi',
  PriceHighLow: 'hilo',
};

export const PASSWORD = 'secret_sauce';

export const USERS = {
  [UserType.Standard]: {
    username: 'standard_user',
    password: PASSWORD,
  },
  [UserType.LockedOut]: {
    username: 'locked_out_user',
    password: PASSWORD,
  },
  [UserType.Problem]: {
    username: 'problem_user',
    password: PASSWORD,
  },
  [UserType.PerformanceGlitch]: {
    username: 'performance_glitch_user',
    password: PASSWORD,
  },
  
};