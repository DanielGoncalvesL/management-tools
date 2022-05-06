import { Router } from 'express';

export default (router: Router): void => {
  router.post('/signup', (request, response) => {
    response.send({ data: 'any_data' });
  });
};
