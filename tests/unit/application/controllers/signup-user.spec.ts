import { SignUpUserController } from '@/application/controllers';
import {
  CompareFieldsValidator,
  RequiredStringValidator,
  EmailValidator,
} from '@/application/validation';
import { MinimumSizeValidator } from '@/application/validation/minimun-size';
import { Logger } from '@/data/contracts/providers';
import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { mock, MockProxy } from 'jest-mock-extended';

describe('SignUpUserController', () => {
  let sut: SignUpUserController;
  let logger: MockProxy<Logger>;
  let signUpUser: MockProxy<SignUpUser>;
  const requestData = {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  };

  beforeAll(() => {
    logger = mock();
    signUpUser = mock();
    signUpUser.perform.mockResolvedValue(new AccessToken('any_token'));
  });

  beforeEach(() => {
    sut = new SignUpUserController(logger, signUpUser);
  });

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(requestData);

    const { email, name, password, passwordConfirmation } = requestData;

    expect(validators).toEqual([
      new RequiredStringValidator([
        { value: name, name: 'name' },
        { value: email, name: 'email' },
        { value: password, name: 'password' },
        { value: passwordConfirmation, name: 'passwordConfirmation' },
      ]),
      new EmailValidator({ value: email, name: 'email' }),
      new CompareFieldsValidator(
        { value: requestData.password, name: 'password' },
        {
          value: requestData.passwordConfirmation,
          name: 'passwordConfirmation',
        },
      ),
      new MinimumSizeValidator(
        {
          value: requestData.password,
          name: 'password',
        },
        6,
      ),
    ]);
  });

  it('should call SignUpUser with correct params', async () => {
    await sut.handle(requestData);

    expect(signUpUser.perform).toHaveBeenCalledWith({
      name: requestData.name,
      email: requestData.email,
      password: requestData.password,
    });
    expect(signUpUser.perform).toHaveBeenCalledTimes(1);
  });

  it('should return 400 if signup fails', async () => {
    signUpUser.perform.mockResolvedValueOnce(new EmailAlreadyUseError());

    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new EmailAlreadyUseError(),
    });
  });

  it('should return 200 if signup succeds', async () => {
    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_token',
      },
    });
  });
});
