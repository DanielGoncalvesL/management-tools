import {
  CompareFieldsError,
  RequiredFieldError,
  ServerError,
  UnauthorizedError,
} from '@/application/errors';

describe('HttpErrors', () => {
  describe('RequiredFieldError', () => {
    it('should be able to return correct name and message', () => {
      const error = new RequiredFieldError('any_field');

      expect(error.name).toBe('RequiredFieldError');
      expect(error.message).toBe('The field any_field is required');
    });
  });

  describe('ServerError', () => {
    it('should be able to return correct name and message', () => {
      const error = new ServerError();

      expect(error.name).toBe('ServerError');
      expect(error.message).toBe('Server failed. Try again soon');
    });
  });

  describe('UnauthorizedError', () => {
    it('should be able to return correct name and message', () => {
      const error = new UnauthorizedError();

      expect(error.name).toBe('UnauthorizedError');
      expect(error.message).toBe('Unauthorized');
    });
  });

  describe('CompareFieldsError', () => {
    it('should be able to return correct name and message', () => {
      const fields = {
        field: 'any_field',
        compareField: 'different_field',
      };

      const error = new CompareFieldsError(fields.field, fields.compareField);

      expect(error.name).toBe('CompareFieldsError');
      expect(error.message).toBe(
        `The fields ${fields.field} and ${fields.compareField} are not equals`,
      );
    });
  });
});
