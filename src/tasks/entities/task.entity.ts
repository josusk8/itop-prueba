import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  public user?: User;

  @Field()
  @Column()
  tittle: string;

  @Field()
  @Column()
  priority: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @DeleteDateColumn()
  public deletedAt: Date;
}
