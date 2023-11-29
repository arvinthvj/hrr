export enum ApiStatusCode {
  SUCCESS = '200',
}
export const Buttontypes = {
  add: 'Add',
  edit: 'Edit',
  upload: 'Upload',
};

export const countKey = [
  'member_count',
  'workspace_count',
  'room_count',
  'parking_count',
];

export const AssetNameAndIcons = {
  workspace: 'Workspace',
  deskIcon: 'chair_1674811663199.svg',
  room: 'Room',
  roomIcon: 'room_1674811314595.svg',
  parking: 'Parking',
  parkingIcon: 'parking_1674811740209.svg',
};

export const SampleCsvDownloadPath = {
  user: 'https://hhplus-bucket.s3.eu-west-1.amazonaws.com/user_sample.csv',
  workspace:
    'https://hhplus-bucket.s3.eu-west-1.amazonaws.com/Workspace_Bulk_Upload.csv',
  room: 'https://hhplus-bucket.s3.eu-west-1.amazonaws.com/Room_Bulk_Upload.csv',
  parking:
    'https://hhplus-bucket.s3.eu-west-1.amazonaws.com/Parking_Bulk_Upload.csv',
};

export const SampleCsvDownloadFilename = {
  user: 'user_sample.csv',
  workspace: 'Workspace_Bulk_Upload.csv',
  room: 'Room_Bulk_Upload.csv',
  parking: 'Parking_Bulk_Upload.csv',
};

export const ValidationMessages = {
  csvFileTypeError: 'file type must be csv',
  noFileError: 'No file chosen',
  charlimitExceed: 'Character limit exceeded',
  specialChar: '^(?!s*$).+, this special characters can only accept',
  noMatchFound: ' No matching results found',
};

export const Descriptions = {
  assetBulkUploadValidationModalHeader: 'Asset upload Validation',
  assetBulkUploadHeader: 'Asset bulk upload',
  removeLocationDesc:
    'A location can only be removed if there are no dependant' +
    'children and no bookings for assets belonging to this' +
    'location. Alternatively, make the location inactive.',
  openInFloorEditor: 'Open in Floorplan Editor',
  active: 'Active',
};

export const locationId = [3,4,5,6,7,8];