import { container } from 'tsyringe';

import IUsersRepositories from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import ToolsRepository from '@modules/tools/infra/typeorm/repositories/ToolsRepository';

import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import TagsRepository from '@modules/tools/infra/typeorm/repositories/TagsRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepositories>('UsersRepository', UsersRepository);
container.registerSingleton<IToolsRepository>('ToolsRepository', ToolsRepository);
container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
