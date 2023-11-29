export const NotificationTabs = {
  notifications: 'Notifications',
  requests: 'Requests',
};

export const NotificationLabel = {
  includePastRequest: 'Include past requests',
  markAllRead: 'Mark all as read',
  notices: 'Notices',
  rooms: 'Rooms',
  parking: 'Parking',
  workspaces: 'Workspaces',
  timeOff: 'Time off',
  incoming: 'Incoming',
  outgoing: 'Outgoing',
  requestedBy: 'Requested by',
  requestedFor: 'Requested for',
  days: 'day(s)',
  desks: 'Desk(s)',
  availrooms: 'Room(s)',
  availPark: 'Parking(s)',
  leave: 'leave',
  remaining: 'Remaining',
  available: 'available',
  thereAre: 'There are',
  reassign: 'Reassign',
  reason: 'Reason',
  approve: 'Approve',
  reject: 'Reject',
  cancel: 'Cancel',
  workspace: 'Workspace',
  room: 'Room',
  noMatchFound: 'No matching results found',
  location: 'Location',
  requestedOn: 'Requested on',
};

export const AlphanumericRegex = /^[a-zA-Z0-9 ]*$/;

export const RequestType = {
  incoming: 'Incoming',
  outgoing: 'Outgoing',
  request: 'Request',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
  pending: 'Pending',
};

export enum REQUEST_ACTION_STATUS {
  ASSET_APPROVE = '1',
  ASSET_REJECT = '6',
  HR_APPROVE = '1',
  HR_REJECT = '2',
}

export enum ASSET_TYPE_ID {
  WORKSPACE = 1,
  ROOM = 2,
  PARKING = 3,
}
