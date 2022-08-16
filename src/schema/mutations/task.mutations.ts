import { GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskType } from '../typeDefs/task.typedef';


export const CREATE_TASK = {
  type: TaskType,
  args: {
    tittle: { type: GraphQLString },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
    userId: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const { userId, tittle, priority, description } = args;

    const result = await Task.insert({
      tittle: tittle,
      priority: priority,
      description: description,
      user: (new User().id = userId),
    });

    console.log(result);
    return { ...args, id: result.identifiers[0].id };
  },
};

export const DELETE_TASK = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const result = await Task.delete(id);
    console.log(result);

    if (result.affected === 1) {
      return true;
    }
    return false;
  },
};

export const UPDATE_TASK = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
    tittle: { type: GraphQLString },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  async resolve(_: any, { id, tittle, priority, description }: any) {
    console.log(id, tittle, priority, description);

    const userFound = await Task.findOne({ where: { id: id } });

    if (userFound == null) {
      return false;
    } else {
      const response = await Task.update(
        { id },
        { tittle: tittle, priority: priority, description: description },
      );
      console.log(response);

      if (response.affected === 0) {
        return false;
      } else {
        return true;
      }
    }
  },
};
