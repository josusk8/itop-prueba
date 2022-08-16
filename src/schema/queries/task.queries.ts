import { GraphQLList, GraphQLID } from 'graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskType } from '../typeDefs/task.typedef';

export const GET_ALL_TASKS = {
  type: new GraphQLList(TaskType),
  async resolve() {
    return await Task.find();
  },
};

export const GET_TASK = {
  type: TaskType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    return await Task.findOne({ where: { id: args.id } });
  },
};
