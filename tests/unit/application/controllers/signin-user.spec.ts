import { SignInUserController } from '@/application/controllers';
import {
  RequiredStringValidator,
  EmailValidator,
} from '@/application/validation';
import { Logger } from '@/domain/contracts/providers';
import { SignInError } from '@/domain/entities/errors';
import { mock, MockProxy } from 'jest-mock-extended';

describe('SignInUserController', () => {
  let sut: SignInUserController;
  let logger: MockProxy<Logger>;
  let signInUser: jest.Mock;

  const requestData = {
    email: 'any_email@email.com',
    password: 'any_password',
  };

  beforeAll(() => {
    logger = mock();
    signInUser = jest.fn();
    signInUser.mockResolvedValue({ accessToken: 'any_token' });
  });

  beforeEach(() => {
    sut = new SignInUserController(logger, signInUser);
  });

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(requestData);

    const { email, password } = requestData;

    expect(validators).toEqual([
      new RequiredStringValidator([
        { value: email, name: 'email' },
        { value: password, name: 'password' },
      ]),
      new EmailValidator({ value: email, name: 'email' }),
    ]);
  });

  it('should call SignInUser with correct params', async () => {
    await sut.handle(requestData);

    expect(signInUser).toHaveBeenCalledWith({
      email: requestData.email,
      password: requestData.password,
    });
    expect(signInUser).toHaveBeenCalledTimes(1);
  });

  it('should return 401 if signIn fails', async () => {
    signInUser.mockRejectedValueOnce(new SignInError());

    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new SignInError(),
    });
  });

  it('should return 200 if signin succeds', async () => {
    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_token',
      },
    });
  });
});
