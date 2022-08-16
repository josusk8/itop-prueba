import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, nullable: false })
  username: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field((type) => [Task])
  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
  })
  public tasks: Task[];
}
