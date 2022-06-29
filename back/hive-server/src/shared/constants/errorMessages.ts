export default {
  nonexistentApiary: (id: any) => `Apiary: ${id} doesn't exist`,
  apiarylessUser: (id: any) => `User ${id} doesn't have any apiary`,
  nonexistentFrame: (id: any) => `Frame: ${id} doesn't exist`,
  nonexistentFrames: () => 'Frames don\'t exist',
  nonexistentStandardFrame: () => 'Frame with type: standard doesn\'t exist',
  ownerlessFrame: (owner: any) => `Frame with owner: ${owner} doesn't exist`,
  nonexistentHive: (id: any) => `Hive: ${id} doesn't exist`,
  nonexistentHives: (apiaryId: string, ownerId: string) => `Apiary with id: ${apiaryId} or owner with id: ${ownerId} not found`,
  invalidEmailPass: () => 'Email or password is invalid',
  duplicateEmailError: () => 'Duplicate email error',
  pathPassIsRequire: () => 'Path `password` is required',
};
