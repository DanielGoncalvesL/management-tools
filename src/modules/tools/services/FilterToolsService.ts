import Tool from '@modules/tools/infra/typeorm/entities/Tool';
// import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class FilterToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(tag: string): Promise<Tool[]> {
    let tools = await this.toolsRepository.filterTools(tag);

    console.log(tools);

    if (!tools) {
      tools = [];
    }

    return tools;
  }
}
