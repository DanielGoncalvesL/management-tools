import Tool from '@modules/tools/infra/typeorm/entities/Tool';
// import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class FilterToolsServiceByTagName {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(data: string): Promise<Tool[]> {
    let tools = await this.toolsRepository.findToolsByTagName(data);

    if (!tools) {
      tools = [];
    }

    return tools;
  }
}
