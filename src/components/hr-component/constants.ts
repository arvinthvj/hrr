import {
  hrIcon1,
  hrIcon10,
  hrIcon2,
  hrIcon3,
  hrIcon4,
  hrIcon5,
  hrIcon6,
  hrIcon7,
  hrIcon8,
} from '../imagepath';

export const hrTabArray = [
  {
    id: 1,
    name: ['Leave', 'Leave'],
    tabName: 'Leave',
    image: hrIcon1,
  },
  {
    id: 2,
    name: ['chart-tab', 'chart_tab'],
    tabName: 'Org chart',
    image: hrIcon2,
  },
  {
    id: 3,
    name: ['personal-tab', 'personal_tab'],
    tabName: 'Personal',
    image: hrIcon3,
  },
  {
    id: 4,
    name: ['job-tab', 'job_tab'],
    tabName: 'Job',
    image: hrIcon4,
  },
  {
    id: 5,
    name: ['preferences-tab', 'preferences_tab'],
    tabName: 'Preferences',
    image: hrIcon5,
  },
  {
    id: 6,
    name: ['benefits-tab', 'benefits_tab'],
    tabName: 'Benefits',
    image: hrIcon6,
  },
  {
    id: 7,
    name: ['assets-tab', 'assets_tab'],
    tabName: 'Assets',
    image: hrIcon7,
  },
  {
    id: 8,
    name: ['performance-tab', 'performance_tab'],
    tabName: 'Performance Management',
    image: hrIcon10,
  },
];

export const marital = [
  { value: 'Single', label: 'Single' },
  { value: 'Married', label: 'Married' },
  { value: 'Divorced', label: 'Divorced' },
  { value: 'Separated', label: 'Separated' },
  { value: 'Widowed', label: 'Widowed' },
];

export const title = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Mrs', label: 'Mrs' },
];

export const gender = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Others', label: 'Others' },
];

export const pronoun = [
  { value: 'He/Him', label: 'He/Him' },
  { value: 'She/Her', label: 'She/Her' },
  { value: 'It', label: 'It' },
  { value: 'We', label: 'We' },
  { value: 'They', label: 'They' },
];

export const Relationship = [
  { value: 'Mother', label: 'Mother' },
  { value: 'Father', label: 'Father' },
  { value: 'Wife', label: 'Wife' },
  { value: 'Husband', label: 'Husband' },
  { value: 'Sister', label: 'Sister' },
  { value: 'Brother', label: 'Brother' },
  { value: 'Partner', label: 'Partner' },
  { value: 'Other', label: 'Other' },
];

export const Type = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Bonus', label: 'Bonus' },
  { value: 'Commission', label: 'Commission' },
  { value: 'By Project', label: 'By Project' },
  { value: 'By Task', label: 'By Task' },
  { value: 'Dividend', label: 'Dividend' },
  { value: 'Monthly Pay Schedule', label: 'Monthly Pay Schedule' },
  { value: 'Semi-Monthly Pay Schedule', label: 'Semi-Monthly Pay Schedule' },
  { value: 'Bi-Weekly Pay Schedule', label: 'Bi-Weekly Pay Schedule' },
  { value: 'Weekly Pay Schedule', label: 'Weekly Pay Schedule' },
];

export const Timetype = [
  { value: 'Full Day', label: 'Full Day', days: 1 },
  { value: 'Half Day AM', label: 'Half Day AM', days: 0.5 },
  { value: 'Half Day PM', label: 'Half Day PM', days: 0.5 },
];

export const Allowance = [
  { value: 'Add', label: 'Add' },
  { value: 'Retract', label: 'Retract' },
];

export const HR_TAB_NAME = {
  LEAVE: 'Leave',
  CHART: 'Org chart',
  PREFERENCES: 'Preferences',
  JOB: 'Job',
  PERSONAL: 'Personal',
  ASSETS: 'Assets',
  BENEFITS: 'Benefits',
  PERFORMANCE: 'Performance Management',
};
