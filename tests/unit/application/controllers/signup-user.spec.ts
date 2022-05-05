import { SignUpUser } from '@/domain/features';
import { mock, MockProxy } from 'jest-mock-extended';

class SignUpUserController {
  constructor(private readonly SignUpUser: SignUpUser) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    if (!httpRequest.name) {
      return {
        statusCode: 400,
        data: new Error('The field token is required'),
      };
    }

    if (!httpRequest.email) {
      return {
        statusCode: 400,
        data: new Error('The field email is required'),
      };
    }

    if (!httpRequest.password) {
      return {
        statusCode: 400,
        data: new Error('The field password is required'),
      };
    }

    await this.SignUpUser.perform(httpRequest);

    return {
      statusCode: 200,
      data: '',
    };
  }
}

type HttpResponse = {
  statusCode: number;
  data: any;
};

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
  });

  beforeEach(() => {
    sut = new SignUpUserController(signUpUser);
  });

  it('should return 400 if name is empty', async () => {
    const httpResponse = await sut.handle({
      email: 'any_email',
      password: 'any_password',
    });

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required'),
    });
  });

  it('should return 400 if email is empty', async () => {
    const httpResponse = await sut.handle({
      name: 'any_name',
      password: 'any_password',
    });

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field email is required'),
    });
  });

  it('should return 400 if password is empty', async () => {
    const httpResponse = await sut.handle({
      name: 'any_name',
      email: 'any_email',
    });

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field password is required'),
    });
  });

  it('should call SignUpUser with correct params', async () => {
    await sut.handle(requestData);

    expect(signUpUser.perform).toHaveBeenCalledWith(requestData);
    expect(signUpUser.perform).toHaveBeenCalledTimes(1);
  });
});
