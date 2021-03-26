import { getRepository, Repository, In } from 'typeorm';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
// import Tag from '@modules/tools/infra/typeorm/entities/Tag';

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

  public async findToolsByTagName(tag: string): Promise<Tool[] | undefined> {
    const toolsIds = await this.ormRepository.createQueryBuilder('tools')
      .leftJoinAndSelect('tools.tags', 'tags')
      .where('tags.name = :name', { name: tag }).getMany();

    const tools = await this.ormRepository.find({
      id: In(toolsIds.map((tool) => tool.id)),
    });

    return tools;
  }

  public async remove(tool: Tool): Promise<void> {
    await this.ormRepository.remove(tool);
  }
}
