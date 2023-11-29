export enum GeneralSettingsTabs {
  COMPANY_SETTINGS = '1',
  PASSWORD_MANAGEMENT = '2',
  STATUS_TYPE = '3',
}

export const GeneralSettingsLabels = {
  generalSettings: 'General settings',
  companySettings: 'Company Settings',
  passwordManagement: 'Password management',
  security: 'Security',
  workingStatusType: 'Working status types',
  nonWorkingStatusTypes: 'Non-working status types',
  cannotChange: 'These cannot be changed',
  statusTypeDesc:
    ' In HybridHero there are two status types, working and non-working. Choose you preferred non-working status types below:',
  nonWorkingStatusTypeDesc:
    'Users in the organisation will see ‘Out of Office’ as default when viewing other’s status',
  specialCharExample: 'e.g. !?/.,_',
  webSessionErrorType: 'WebSession',
  webSessionErrorText: 'Please select minimum 15 minutes to maximum 90 minutes',
};

export const WorkingStatusTypes = {
  inOffice: 'In office',
  remote: 'Remote',
};

export const NonWorkingStatusTypes = {
  sick: 'Sick',
  outOfOffice: 'Out of Office',
  vacation: 'Vacation',
  other: 'Other',
};

export const MinimumWebSession = 15;
export const MaximumWebSession = 90;
