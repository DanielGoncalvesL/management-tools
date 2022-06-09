import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { PgTag } from '@/infra/db/postgres/entities';

@Entity({ name: 'tools' })
export class PgTool {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, unique: true })
  title!: string;

  @Column({ nullable: false })
  link!: string;

  @Column({ nullable: false })
  description!: string;

  @ManyToMany(() => PgTag, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable({
    name: 'tools_has_tags', // table name for the junction table of this relation
    joinColumn: {
      name: 'tool_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags!: PgTag[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
