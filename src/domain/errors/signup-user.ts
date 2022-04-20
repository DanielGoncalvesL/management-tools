export class SignUpUserError extends Error {
  constructor() {
    super('SignUp failed');
    this.name = 'SignUpError';
  }
}
