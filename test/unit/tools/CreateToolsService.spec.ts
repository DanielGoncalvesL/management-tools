import FakeTagsRepository from '@modules/tools/repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '@modules/tools/repositories/fakes/FakeToolsRepository';
import AppError from '@shared/errors/AppError';
import CreateToolService from '@modules/tools/services/CreateToolService';

let fakeTagsRepository: FakeTagsRepository;
let fakeToolsRepository: FakeToolsRepository;
let createToolService: CreateToolService;

describe('CreateTool', () => {
  beforeEach(() => {
    fakeTagsRepository = new FakeTagsRepository();
    fakeToolsRepository = new FakeToolsRepository();
    createToolService = new CreateToolService(fakeToolsRepository);
  });

  it('should be able to create a tool', async () => {
    const tag = await fakeTagsRepository.create('test');

    const tool = await createToolService.execute({
      title: 'test',
      link: 'teste.com',
      description: 'this is a test',
      tags: [tag],
    });

    expect(tool).toHaveProperty('title');
    expect(tool.title).toBe('test');
  });

  it('should not be able to create a tool this already exist', async () => {
    const tag = await fakeTagsRepository.create('test');

    await fakeToolsRepository.create({
      title: 'test',
      link: 'teste.com',
      description: 'this is a test',
      tags: [tag],
    });

    await expect(createToolService.execute({
      title: 'test',
      link: 'teste.com',
      description: 'this is a test',
      tags: [tag],
    })).rejects.toBeInstanceOf(AppError);
  });
});
