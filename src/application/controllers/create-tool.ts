import { Logger } from '@/domain/contracts/providers';
import { CreateTags, CreateTool } from '@/domain/use-cases';
import { badRequest, HttpResponse, ok } from '@/application/helpers';
import { ValidationBuilder, Validator } from '@/application/validation';
import { Controller } from '@/application/controllers';

type HttpRequest = {
  title: string;
  link: string;
  description: string;
  tags: string[];
};

type Model = Error | { id: string; createdAt: Date };

export class CreateToolController extends Controller {
  constructor(
    logger: Logger,
    private readonly createTags: CreateTags,
    private readonly createTool: CreateTool,
  ) {
    super(logger);
  }

  async perform({
    description,
    link,
    tags,
    title,
  }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const createTagsResult = await this.createTags({ tagsName: tags });

      const { id, createdAt } = await this.createTool({
        description,
        link,
        tags: createTagsResult.tags,
        title,
      });

      return ok({ id, createdAt });
    } catch (error) {
      return badRequest(error as Error);
    }
  }

  override buildValidators({
    description,
    link,
    tags,
    title,
  }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of()
        .required({
          fields: [
            { value: description, name: 'description' },
            { value: link, name: 'link' },
            { value: title, name: 'title' },
          ],
        })
        .build(),

      ...ValidationBuilder.of()
        .min({
          field: { name: 'tags', value: tags },
          min: 1,
        })
        .build(),
    ];

    return validators;
  }
}
