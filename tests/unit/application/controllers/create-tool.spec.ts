import { CreateToolController } from '@/application/controllers/create-tool';
import { RequiredStringValidator } from '@/application/validation';
import { MinimumSizeValidator } from '@/application/validation/minimun-size';
import { Logger } from '@/domain/contracts/providers';
import { Tag } from '@/domain/entities';
import { ToolAlreadyUseError } from '@/domain/entities/errors';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateToolController', () => {
  let sut: CreateToolController;
  let logger: MockProxy<Logger>;
  let createTags: jest.Mock;
  let createTool: jest.Mock;

  const createToolParams = {
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: ['any_tag'],
  };

  const tagsArray = [new Tag('any_id', 'any_name', new Date())];

  const createdAtDate = new Date();

  beforeAll(() => {
    logger = mock();

    createTags = jest.fn();
    createTool = jest.fn();

    createTags.mockResolvedValue({
      tags: tagsArray,
    });

    createTool.mockResolvedValue({
      id: 'any_tool_id',
      createdAt: createdAtDate,
    });
  });

  beforeEach(() => {
    sut = new CreateToolController(logger, createTags, createTool);
  });

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators(createToolParams);

    const { description, link, tags, title } = createToolParams;

    expect(validators).toEqual([
      new RequiredStringValidator([
        { value: description, name: 'description' },
        { value: link, name: 'link' },
        { value: title, name: 'title' },
      ]),
      new MinimumSizeValidator({ name: 'tags', value: tags }, 1),
    ]);
  });

  it('should call CreateTags with correct params', async () => {
    await sut.handle(createToolParams);

    expect(createTags).toHaveBeenCalledWith({
      tagsName: createToolParams.tags,
    });
    expect(createTags).toHaveBeenCalledTimes(1);
  });

  it('should call CreateTool with correct params', async () => {
    await sut.handle(createToolParams);

    const { description, link, title } = createToolParams;

    expect(createTool).toHaveBeenCalledWith({
      description,
      link,
      tags: tagsArray,
      title,
    });
    expect(createTool).toHaveBeenCalledTimes(1);
  });

  it('should return 400 if CreateTool fails', async () => {
    createTool.mockRejectedValueOnce(new ToolAlreadyUseError());

    const httpResponse = await sut.handle(createToolParams);

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new ToolAlreadyUseError(),
    });
  });

  it('should return 200 if CreateToolController succeds', async () => {
    const httpResponse = await sut.handle(createToolParams);

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_tool_id',
        createdAt: createdAtDate,
      },
    });
  });
});
