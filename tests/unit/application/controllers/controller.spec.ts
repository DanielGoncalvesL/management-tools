import { Controller } from '@/application/controllers';
import { ServerError } from '@/application/errors';
import { ValidationComposite } from '@/application/validation';
import { mocked } from 'jest-mock';
import { HttpResponse } from '@/application/helpers';
import { Logger } from '@/domain/contracts/providers';
import { mock } from 'jest-mock-extended';

jest.mock('@/application/validation/composite');

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async perform(httpRequest: any): Promise<HttpResponse> {
    return this.result;
  }
}

describe('Controller', () => {
  let sut: ControllerStub;
  let logger: Logger;

  beforeEach(() => {
    logger = mock();

    sut = new ControllerStub(logger);
  });

  it('should return 400 if validation', async () => {
    const error = new Error('validation_error');

    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValue(error),
    }));

    mocked(ValidationComposite).mockImplementation(ValidationCompositeSpy);

    const httpResponse = await sut.handle('any_value');

    expect(ValidationComposite).toHaveBeenCalledWith([]);

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error,
    });
  });

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform_error');

    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error);

    const httpResponse = await sut.handle('any_value');

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    });
  });

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle('any_value');

    expect(httpResponse).toEqual(sut.result);
  });
});
