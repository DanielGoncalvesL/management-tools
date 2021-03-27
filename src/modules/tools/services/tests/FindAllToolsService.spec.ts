import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository';
import FakeTagsRepository from '@modules/tools/repositories/fakes/FakeTagsRepository';
// import AppError from '@shared/errors/AppError';
import FindAllToolsService from '@modules/tools/services/FindAllToolsService';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let findAllToolsService: FindAllToolsService;

describe('FindAllTools', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    fakeToolsRepository = new FakeToolsRepository();
    findAllToolsService = new FindAllToolsService(fakeToolsRepository);
  });

  it('should be able to list a tools', async () => {
    const tag = await fakeTagsRepository.create('test');

    const tool = await fakeToolsRepository.create({
      title: 'test',
      link: 'teste.com',
      description: 'this is a test',
      tags: [tag],
    });

    const findAllTools = await findAllToolsService.execute();

    expect(findAllTools).toEqual(
      expect.arrayContaining([
        tool,
      ]),
    );
  });

  it('should be able to return an empty list when no tools are registered', async () => {
    jest.spyOn(fakeToolsRepository, 'listTools').mockImplementationOnce(async () => undefined);

    const findAllTools = await findAllToolsService.execute();

    expect(findAllTools).toEqual(
      expect.arrayContaining([]),
    );
  });
});
