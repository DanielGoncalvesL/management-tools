import { Controller } from '@/application/controllers';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';

export const adaptResolver = async (controller: Controller, args: any) => {
  const httpResponse = await controller.handle(args);

  switch (httpResponse.statusCode) {
    case 200:
    case 204:
      return httpResponse.data;
    case 400:
      throw new UserInputError(httpResponse.data.message);
    case 401:
      throw new AuthenticationError(httpResponse.data.message);
    case 403:
      throw new ForbiddenError(httpResponse.data.message);
    default:
      throw new ApolloError(httpResponse.data.message);
  }
};
