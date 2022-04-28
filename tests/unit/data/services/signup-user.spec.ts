import { SignUpUser } from '@/domain/features';

class SignUpUserService {
  constructor(private readonly loadUserByEmail: LoadUserByEmailRepository) {}

  async perform(params: SignUpUser.Params): Promise<void> {
    const { email } = params;

    await this.loadUserByEmail.loadByEmail({ email });
  }
}

interface LoadUserByEmailRepository {
  loadByEmail: (params: LoadUserByEmailRepository.Params) => Promise<void>;
}

namespace LoadUserByEmailRepository {
  export type Params = {
    email: string;
  };
}

class LoadUserByEmailSpy implements LoadUserByEmailRepository {
  email?: string;

  async loadByEmail(params: LoadUserByEmailRepository.Params): Promise<void> {
    this.email = params.email;
  }
}

describe('SignUpUserService', () => {
  it('should call LoadUserByEmail with correct params', async () => {
    const loadUserByEmail = new LoadUserByEmailSpy();

    const sut = new SignUpUserService(loadUserByEmail);

    await sut.perform({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });

    expect(loadUserByEmail.email).toBe('any_email');
  });
});
