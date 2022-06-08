export class SignInError extends Error {
  constructor() {
    super('Incorrect email/password combination');
    this.name = 'SignInError';
  }
}
