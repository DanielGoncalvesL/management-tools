export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon');
    this.name = 'ServerError';
    this.stack = error?.stack;
  }
}

export class RequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`The field ${fieldName} is required`);
    this.name = 'RequiredFieldError';
  }
}

export class CompareFieldsError extends Error {
  constructor(field: string, compareField: string) {
    super(`The fields ${field} and ${compareField} are not equals`);
    this.name = 'CompareFieldsError';
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
