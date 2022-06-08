import { ToolAlreadyUseError } from '@/domain/entities/errors';

describe('ToolAlreadyUseError', () => {
  it('should be able to return correct name and message', () => {
    const error = new ToolAlreadyUseError();

    expect(error.name).toBe('ToolAlreadyUseError');
    expect(error.message).toBe('Tool already use');
  });
});
