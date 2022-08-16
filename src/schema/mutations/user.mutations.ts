import { GraphQLBoolean, GraphQLID, GraphQLList, GraphQLString } from 'graphql';
import { UserType } from '../typeDefs/user.typedef';
import bcrypt from 'bcryptjs';
import { TaskType } from '../typeDefs/task.typedef';
import { User } from 'src/users/entities/user.entity';

export const CREATE_USER = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { username, password } = args;

    const encryptPassword = await bcrypt.hash(password, 10);

    const result = await User.insert({
      username: username,
      password: encryptPassword,
    });

    console.log(result);
    return { ...args, id: result.identifiers[0].id, password: encryptPassword };
  },
};

export const DELETE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const result = await User.delete(id);
    console.log(result);

    if (result.affected === 1) {
      return true;
    }
    return false;
  },
};

export const UPDATE_USER = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(_: any, { id, username, oldPassword, newPassword }: any) {
    console.log(id, username, oldPassword, newPassword);

    const userFound = await User.findOne({ where: { id: id } });

    if (userFound == null) {
      return false;
    } else {
      const isMatch = await bcrypt.compare(oldPassword, userFound.password);
      if (!isMatch) {
        return false;
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);

      const response = await User.update(
        { id },
        { username: username, password: passwordHash },
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
