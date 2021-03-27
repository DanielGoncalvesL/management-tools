import Tool from '@modules/tools/infra/typeorm/entities/Tool';
// import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class FilterToolsByTagNameService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(tag: string): Promise<Tool[]> {
    let tools = await this.toolsRepository.findToolsByTagName(tag);

    if (!tools) {
      tools = [];
    }

    return tools;
  }
}
