import { getRepository, Repository } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';

export default class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async findById(id: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne(id);

    return tool;
  }

  public async findByTitle(title: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne({
      where: { title },
    });

    return tool;
  }

  public async create(data: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create(data);

    return this.ormRepository.save(tool);
  }

  public async save(tool:Tool): Promise<Tool> {
    return this.ormRepository.save(tool);
  }

  public async listTools(): Promise<Tool[] | undefined> {
    return this.ormRepository.find();
  }

  public async filterTools(tag: string): Promise<Tool[] | undefined> {
    return this.ormRepository.createQueryBuilder('tools').innerJoinAndMapMany('tools.tags', 'tags', '').where('tags.name = :name', { name: tag }).getMany();
  }

  public async remove(tool: Tool): Promise<void> {
    await this.ormRepository.remove(tool);
  }
}
