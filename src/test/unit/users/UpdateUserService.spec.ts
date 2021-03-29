import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserService: UpdateUserService;
let createUserService: CreateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserService = new UpdateUserService(fakeUserRepository);
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
    });

    expect(updatedUser.name).toBe('Jhon Trê');
    expect(updatedUser.email).toBe('jhontre@example.com');
  });

  it('should be able to update the profile from non-existing user', async () => {
    await expect(updateUserService.execute({
      user_id: 'non-existing-id',
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await createUserService.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user = await createUserService.execute({
      name: 'Test',
      email: 'test@example.com',
      password: '123123',
    });

    await expect(updateUserService.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhondoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });
});
