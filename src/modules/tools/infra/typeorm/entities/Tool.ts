import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Tag from '@modules/tools/infra/typeorm/entities/Tag';

@Entity('tools')
export default class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @ManyToMany(() => Tag, (tag) => tag.tools, {
    cascade: ['insert', 'update'], eager: true,
  })
  @JoinTable({
    name: 'tags_tools', // table name for the junction table of this relation
    joinColumn: {
      name: 'tools',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tags',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
