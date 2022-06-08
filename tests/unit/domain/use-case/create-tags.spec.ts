import { CreateTagRepository } from '@/domain/contracts/repositories';
import { CreateTags, setupCreateTags } from '@/domain/use-cases';
import { mock, MockProxy } from 'jest-mock-extended';
import { throwError } from '@/tests/mocks';
import { Tag } from '@/domain/entities';

describe('CreateTags', () => {
  let tagRepository: MockProxy<CreateTagRepository>;
  let sut: CreateTags;

  const createTagsData = {
    tagsName: ['any_tag1', 'any_tag2'],
  };

  const createdAtDate = new Date();

  const tags = [
    new Tag('any_id1', 'any_tag1', createdAtDate),
    new Tag('any_id2', 'any_tag2', createdAtDate),
  ];

  beforeEach(() => {
    tagRepository = mock();

    tagRepository.create.mockResolvedValue(tags);

    sut = setupCreateTags(tagRepository);
  });

  it('should call CreateTagRepository with correct params', async () => {
    await sut(createTagsData);

    expect(tagRepository.create).toHaveBeenCalledWith({
      names: createTagsData.tagsName,
    });

    expect(tagRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw if CreateTagRepository throws', async () => {
    tagRepository.create.mockImplementationOnce(throwError);

    const promise = sut(createTagsData);

    await expect(promise).rejects.toThrow();
  });

  it('should return tags with success', async () => {
    const createTagsResult = await sut(createTagsData);

    expect(createTagsResult).toEqual({
      tags,
    });
  });
});
