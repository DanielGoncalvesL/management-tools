// import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import AppError from '@shared/errors/AppError';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const tool = await this.toolsRepository.findById(id);

    if (!tool) {
      throw new AppError('Tool is not existed!');
    }

    await this.toolsRepository.remove(tool);
  }
}
