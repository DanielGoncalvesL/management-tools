import { mocked } from 'ts-jest/utils';
import {
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository,
} from 'typeorm';
import { PgConnection } from '@/infra/db/postgres/helpers';
import { PgConnectionNotFoundError } from '@/infra/db/postgres/helpers/connection-error';

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn(),
}));

describe('PgConnection', () => {
  let getConnectionManagerSpy: jest.Mock;
  let createQueryRunnerSpy: jest.Mock;
  let createConnectionSpy: jest.Mock;
  let getConnectionSpy: jest.Mock;
  let hasSpy: jest.Mock;
  let closeSpy: jest.Mock;
  let startTransactionSpy: jest.Mock;
  let releaseSpy: jest.Mock;
  let commitTransactionSpy: jest.Mock;
  let rollbackTransactionSpy: jest.Mock;
  let getRepositorySpy: jest.Mock;
  let sut: PgConnection;

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true);
    getConnectionManagerSpy = jest.fn().mockReturnValue({
      has: hasSpy,
    });
    startTransactionSpy = jest.fn();
    commitTransactionSpy = jest.fn();
    rollbackTransactionSpy = jest.fn();
    releaseSpy = jest.fn();
    getRepositorySpy = jest.fn().mockReturnValue('any_repo');
    createQueryRunnerSpy = jest.fn().mockReturnValue({
      startTransaction: startTransactionSpy,
      commitTransaction: commitTransactionSpy,
      rollbackTransaction: rollbackTransactionSpy,
      release: releaseSpy,
      manager: { getRepository: getRepositorySpy },
    });
    createConnectionSpy = jest.fn().mockResolvedValue({
      createQueryRunner: createQueryRunnerSpy,
    });
    closeSpy = jest.fn();
    getConnectionSpy = jest.fn().mockReturnValue({
      createQueryRunner: createQueryRunnerSpy,
      close: closeSpy,
    });
    mocked(createConnection).mockImplementation(createConnectionSpy);
    mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy);
    mocked(getConnection).mockImplementation(getConnectionSpy);
    mocked(getRepository).mockImplementation(getRepositorySpy);
  });

  beforeEach(() => {
    sut = PgConnection.getInstance();
  });

  it('should have only one instance', () => {
    const sut2 = PgConnection.getInstance();

    expect(sut).toBe(sut2);
  });

  it('should create a new connection', async () => {
    hasSpy.mockReturnValueOnce(false);

    await sut.connect();

    expect(createConnectionSpy).toHaveBeenCalledWith();
    expect(createConnectionSpy).toHaveBeenCalledTimes(1);

    expect(hasSpy).toHaveBeenCalledTimes(1);
    expect(hasSpy).toHaveBeenCalledWith('default');
  });

  it('should use an existing connection', async () => {
    await sut.connect();

    expect(getConnectionSpy).toHaveBeenCalledWith();
    expect(getConnectionSpy).toHaveBeenCalledTimes(1);
  });

  it('should close connection', async () => {
    await sut.connect();
    await sut.disconnect();

    expect(closeSpy).toHaveBeenCalledWith();
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should return ConnectionNotFoundError on disconnect if connection is not found', async () => {
    const promise = sut.disconnect();

    expect(closeSpy).not.toHaveBeenCalled();
    await expect(promise).rejects.toThrow(new PgConnectionNotFoundError());
  });
});
