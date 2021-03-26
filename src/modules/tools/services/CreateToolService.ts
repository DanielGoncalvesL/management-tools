import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest{
    title: string;
    link:string;
    description: string;
    tags: Tag[];
}

@injectable()
export default class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute({
    title, link, description, tags,
  }: IRequest): Promise<Tool> {
    const checkToolExists = await this.toolsRepository.findByTitle(title);

    if (checkToolExists) {
      throw new AppError('Tool already exists');
    }

    const tool = await this.toolsRepository.create({
      title, link, description, tags,
    });

    return tool;
  }
}
