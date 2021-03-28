import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class CreateToolsTags1616952744204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tools_has_tags',
        columns: [
          {
            name: 'tool_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tag_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'ToolsTags',
            columnNames: ['tool_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tools',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }),
          new TableForeignKey({
            name: 'TagsTools',
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tools_has_tags');
  }
}
