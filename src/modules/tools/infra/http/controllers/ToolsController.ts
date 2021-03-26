import { Request, Response } from 'express';
import CreateTagService from '@modules/tools/services/CreateTagService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';
import CreateToolService from '@modules/tools/services/CreateToolService';
import ListToolsService from '@modules/tools/services/ListToolsService';
import { container } from 'tsyringe';

export default class ToolsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      title, link, description, tags,
    } = request.body;

    const createTagService = container.resolve(CreateTagService);

    const createToolService = container.resolve(CreateToolService);

    const parseTags = await createTagService.execute({ tags });

    const { tags: createdTags, ...rest } = await createToolService.execute({
      title, link, description, tags: parseTags,
    });

    return response.status(201).json({ ...rest, tags: createdTags.map((tag) => tag.name) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteToolService = container.resolve(DeleteToolService);

    await deleteToolService.execute(id);

    return response.status(204).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // const { id } = request.params;

    const deleteToolService = container.resolve(ListToolsService);

    const tools = await deleteToolService.execute();

    return response.status(200).json(tools.map((tool) => {
      const { tags: createdTags, ...rest } = tool;
      return { ...rest, tags: createdTags.map((tag) => tag.name) };
    }));
  }
}
