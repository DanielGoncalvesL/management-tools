import FakeTagsRepository from '@modules/tools/repositories/fakes/FakeTagsRepository';
// import AppError from '@shared/errors/AppError';
import CreateTagsService from '@modules/tools/services/CreateTagsService';

let fakeTagsRepository: FakeTagsRepository;
let createTagsService: CreateTagsService;

describe('CreateTag', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    createTagsService = new CreateTagsService(fakeTagsRepository);
  });

  it('should be able to create a tags that not exist', async () => {
    const tags = await createTagsService.execute({
      tags: ['node', 'json'],
    });

    const tag1 = await fakeTagsRepository.findTagByName('node');
    const tag2 = await fakeTagsRepository.findTagByName('json');

    expect(tags).toEqual(
      expect.arrayContaining([
        tag1,
        tag2,
      ]),
    );
  });

  it('should be able to create a tags that already exist', async () => {
    const tag1 = await fakeTagsRepository.create('node');
    const tag2 = await fakeTagsRepository.create('json');

    const tags = await createTagsService.execute({
      tags: [tag1.name, tag2.name],
    });

    expect(tags).toEqual(
      expect.arrayContaining([
        tag1,
        tag2,
      ]),
    );
  });
});
