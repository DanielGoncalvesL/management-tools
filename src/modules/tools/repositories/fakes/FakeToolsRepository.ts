import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
// import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import { v4 as uuid } from 'uuid';

export default class ToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  public async findById(id: string): Promise<Tool | undefined> {
    const findById = this.tools.find((tool) => tool.id === id);

    return findById;
  }

  public async findByTitle(title: string): Promise<Tool | undefined> {
    const findByTitle = this.tools.find((tool) => tool.title === title);

    return findByTitle;
  }

  public async create(data: ICreateToolDTO): Promise<Tool> {
    const tool = new Tool();

    Object.assign(tool, { id: uuid() }, data);

    this.tools.push(tool);

    return this.save(tool);
  }

  public async save(tool:Tool): Promise<Tool> {
    const findIndex = this.tools.findIndex((findTool) => findTool.id === tool.id);

    this.tools[findIndex] = tool;

    return tool;
  }

  public async listTools(): Promise<Tool[] | undefined> {
    return this.tools;
  }

  public async findToolsByTagName(tag: string): Promise<Tool[] | undefined> {
    const findToolsByTagName = this.tools.filter((tool) => {
      const findTagName = tool.tags.find((findTag) => findTag.name === tag);

      if (findTagName) {
        return tool;
      }
    });

    return findToolsByTagName;
  }

  public async remove(tool: Tool): Promise<void> {
    this.tools.splice(this.tools.indexOf(tool), 1);
  }
}
