import { Controller } from '@/application/controllers';

export const adaptResolver = async (controller: Controller, args: any) => {
  const httpResponse = await controller.handle(args);

  return httpResponse.data;
};
