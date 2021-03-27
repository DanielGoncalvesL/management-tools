import faker from 'faker';
import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository';
import FakeTagsRepository from '@modules/tools/repositories/fakes/FakeTagsRepository';
// import AppError from '@shared/errors/AppError';
import FilterToolsByTagNameService from '@modules/tools/services/FilterToolsByTagNameService';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let filterToolsByTagNameService: FilterToolsByTagNameService;

describe('FilterToolsByTagNameService', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    fakeToolsRepository = new FakeToolsRepository();
    filterToolsByTagNameService = new FilterToolsByTagNameService(fakeToolsRepository);
  });

  it('should be able to filter tools by tags', async () => {
    const tag = await fakeTagsRepository.create(faker.random.word());

    const tool = await fakeToolsRepository.create({
      title: faker.random.words(2),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [tag],
    });

    const filterToolsByTagName = await filterToolsByTagNameService.execute(tag.name);

    expect(filterToolsByTagName).toEqual(
      expect.arrayContaining([
        tool,
      ]),
    );
  });

  it('should be able to return an empty list when no tools are registered', async () => {
    jest.spyOn(fakeToolsRepository, 'findToolsByTagName').mockImplementationOnce(async () => undefined);

    const filterToolsByTagName = await filterToolsByTagNameService.execute('non-existing-id');

    expect(filterToolsByTagName).toEqual(
      expect.arrayContaining([]),
    );
  });
});
