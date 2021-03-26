import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';

export default interface IToolsRepository{
  listTools(): Promise<Tool[] | undefined>;
  findById(id: string): Promise<Tool | undefined>;
  findByTitle(title: string): Promise<Tool | undefined>;
  create(data: ICreateToolDTO): Promise<Tool>;
  save(tool: Tool): Promise<Tool>;
  remove(tool: Tool): Promise<void>;
}
