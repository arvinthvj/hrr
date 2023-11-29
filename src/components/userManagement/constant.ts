export enum ApiStatusCode {
  SUCCESS = 200,
}
export const UserDataEvent = {
  editUser: 'EDIT_USER',
  useMount: 'USE_MOUNT',
  addTeam: 'ADD_TEAM',
};

export const UserSettingsLabels = {
  inviteNewUser: 'Invite a new user',
  inviteMultipleUser: 'Invite multiple new users',
  disabled: 'desabled',
  noResultFound: 'No matching results found!',
  continueAddUser: ' To continue, please add location and team',
  selectTeamDesc:
    'Select a team for this user. Teams can be fundamental to what assets a user can book.',
  primaryTeamDesc:
    ' A user must be assigned a primary team. This is their main team for reporting and organisation purposes.',
  pleaseSelectTeam: ' Please select one team',
  pleaseSelectLocation: 'Please select Location',
  secondaryTeams: ' Secondary team(s)   ',
  secondaryTeamDesc:
    ' If selected, a user can book assets assigned to the teams below.',
  bulkUploadFileTypeError: ' Please upload csv/xlsx file only',
  userBulkUpload: 'User bulk upload',
  userUploadValidation: 'User upload validation',
  removeUser: 'Remove User',
  userBulkEdit: 'Selecting a field will trigger a change to all selected',
};
