const userErrorService = {
  userNotFound: new Error('User not found'),
  invalidPassword: new Error('Invalid password'),
  userAlreadyExists: new Error('User already exists')
}

const ttechnologyErrorService = {
  technologyNotFound: new Error('Technology not found')
}

const stackErrorService = {
  stackNotFound: new Error('Stack not found')
}

const projectErrorService = {
  projectNotFound: new Error('Project not found'),
  projectDeletionFailed: new Error('Project deletion failed')
}

const mediaErrorService = {
  mediaNotFound: new Error('Media not found'),
  mediaUploadFailed: new Error('Media upload failed'),
  mediaDeletionFailed: new Error('Media deletion failed')
}

export const errorService = {
  ...projectErrorService,
  ...mediaErrorService,
  ...stackErrorService,
  ...ttechnologyErrorService,
  ...userErrorService
}
