import { Request, Response } from 'express';
import AuthUserService from '@modules/users/services/AuthUserService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authController = container.resolve(AuthUserService);

    const { user, token } = await authController.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
