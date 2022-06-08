import {
  CheckToolByTitleRepository,
  CreateToolRepository,
} from '@/domain/contracts/repositories';
import { CreateTool, setupCreateTool } from '@/domain/use-cases';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/mocks';
import { ToolAlreadyUseError } from '@/domain/entities/errors';
import { Tag } from '@/domain/entities';

describe('CreateTool', () => {
  let toolRepository: MockProxy<
    CreateToolRepository & CheckToolByTitleRepository
  >;
  let sut: CreateTool;

  const createToolData = {
    description: 'any_description',
    link: 'any_link.com',
    tags: [new Tag('any_id', 'any_name', new Date())],
    title: 'any_title',
  };

  const createdAtDate = new Date();

  beforeEach(() => {
    toolRepository = mock();

    toolRepository.create.mockResolvedValue({
      id: 'any_id',
      createdAt: createdAtDate,
    });

    toolRepository.checkByTitle.mockResolvedValue(false);

    sut = setupCreateTool(toolRepository);
  });

  it('should call checkByTitle with correct params', async () => {
    await sut(createToolData);

    expect(toolRepository.checkByTitle).toHaveBeenCalledWith({
      title: 'any_title',
    });

    expect(toolRepository.checkByTitle).toHaveBeenCalledTimes(1);
  });

  it('should throw ToolAlreadyUseError when checkByTitle returns true', async () => {
    toolRepository.checkByTitle.mockResolvedValueOnce(true);

    const promise = sut(createToolData);

    await expect(promise).rejects.toThrow(new ToolAlreadyUseError());
  });

  it('should throw if checkByTitle throws', async () => {
    toolRepository.checkByTitle.mockImplementationOnce(throwError);

    const promise = sut(createToolData);

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateToolRepository with correct params', async () => {
    await sut(createToolData);

    expect(toolRepository.create).toBeCalledWith({
      description: createToolData.description,
      link: createToolData.link,
      tags: createToolData.tags,
      title: createToolData.title,
    });
    expect(toolRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if CreateToolRepository throws', async () => {
    toolRepository.create.mockImplementationOnce(throwError);

    const promise = sut(createToolData);

    await expect(promise).rejects.toThrow();
  });

  it('should return id and createdAt with success', async () => {
    const createToolResult = await sut(createToolData);

    expect(createToolResult).toEqual({
      id: 'any_id',
      createdAt: createdAtDate,
    });
  });
});
