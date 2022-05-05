import { SignUpUserController } from '@/application/controllers';
import { ServerError, UnauthorizedError } from '@/application/errors';
import {
  RequiredStringValidator,
  ValidationComposite,
} from '@/application/validation';
import { EmailAlreadyUseError } from '@/domain/errors';
import { SignUpUser } from '@/domain/features';
import { AccessToken } from '@/domain/models/access-token';
import { mock, MockProxy } from 'jest-mock-extended';
import { mocked } from 'jest-mock';

jest.mock('@/application/validation/composite');

describe('SignUpUserController', () => {
  let sut: SignUpUserController;
  let signUpUser: MockProxy<SignUpUser>;
  const requestData = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
  };

  beforeAll(() => {
    signUpUser = mock();
    signUpUser.perform.mockResolvedValue(new AccessToken('any_token'));
  });

  beforeEach(() => {
    sut = new SignUpUserController(signUpUser);
  });

  it('should return 400 if validation', async () => {
    const error = new Error('validation_error');

    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValue(error),
    }));

    mocked(ValidationComposite).mockImplementation(ValidationCompositeSpy);

    const httpResponse = await sut.handle(requestData);

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredStringValidator(requestData.name, 'name'),
      new RequiredStringValidator(requestData.email, 'email'),
      new RequiredStringValidator(requestData.password, 'password'),
    ]);

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error,
    });
  });

  it('should call SignUpUser with correct params', async () => {
    await sut.handle(requestData);

    expect(signUpUser.perform).toHaveBeenCalledWith(requestData);
    expect(signUpUser.perform).toHaveBeenCalledTimes(1);
  });

  it('should return 401 if signup fails', async () => {
    signUpUser.perform.mockResolvedValueOnce(new EmailAlreadyUseError());

    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
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

  it('should return 500 if authentication throws', async () => {
    const error = new Error('infra_error');

    signUpUser.perform.mockRejectedValueOnce(error);

    const httpResponse = await sut.handle(requestData);

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    });
  });
});
