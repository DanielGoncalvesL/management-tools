import { SignUpUserController } from '@/application/controllers';
import {
  CompareFieldsValidator,
  RequiredStringValidator,
} from '@/application/validation';
import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { mock, MockProxy } from 'jest-mock-extended';

describe('SignUpUserController', () => {
  let sut: SignUpUserController;
  let signUpUser: MockProxy<SignUpUser>;
  const requestData = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  };

  beforeAll(() => {
    signUpUser = mock();
    signUpUser.perform.mockResolvedValue(new AccessToken('any_token'));
  });

  beforeEach(() => {
    sut = new SignUpUserController(signUpUser);
  });

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(requestData);

    expect(validators).toEqual([
      new RequiredStringValidator(requestData.name, 'name'),
      new RequiredStringValidator(requestData.email, 'email'),
      new RequiredStringValidator(requestData.password, 'password'),
      new CompareFieldsValidator(
        requestData.password,
        requestData.passwordConfirmation,
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

  it('should return 401 if signup fails', async () => {
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
