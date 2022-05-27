export class EmailAlreadyUseError extends Error {
  constructor() {
    super('SignUp failed: Email already use');
    this.name = 'EmailAlreadyUseError';
  }
}
