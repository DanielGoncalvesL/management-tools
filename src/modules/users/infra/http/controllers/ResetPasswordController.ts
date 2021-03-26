import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      user_id,
      password,
    });

    return response.status(204).json();
  }
}
