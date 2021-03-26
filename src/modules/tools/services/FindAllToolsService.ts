import Tool from '@modules/tools/infra/typeorm/entities/Tool';
// import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class FindAllToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(): Promise<Tool[]> {
    let tools = await this.toolsRepository.listTools();

    if (!tools) {
      tools = [];
    }

    return tools;
  }
}
