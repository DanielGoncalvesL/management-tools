import faker from 'faker';
import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository';
import FakeTagsRepository from '@modules/tools/repositories/fakes/FakeTagsRepository';
import AppError from '@shared/errors/AppError';
import DeleteToolService from '@modules/tools/services/DeleteToolService';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let deleteToolService: DeleteToolService;

describe('DeleteTools', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    fakeToolsRepository = new FakeToolsRepository();
    deleteToolService = new DeleteToolService(fakeToolsRepository);
  });

  it('should delete the tools when founded', async () => {
    const tag = await fakeTagsRepository.create(faker.random.word());

    const tool = await fakeToolsRepository.create({
      title: faker.random.words(2),
      link: faker.internet.url(),
      description: faker.commerce.productDescription(),
      tags: [tag],
    });

    const removeToolSpy = jest.spyOn(fakeToolsRepository, 'remove');

    await deleteToolService.execute(tool.id);

    expect(removeToolSpy).toHaveBeenCalledWith(tool);
    expect(removeToolSpy).toBeCalledTimes(1);
  });

  it('should not delete the tool when it is not found', async () => {
    await expect(deleteToolService.execute('non-existing-id'))
      .rejects
      .toBeInstanceOf(AppError);
  });
});
