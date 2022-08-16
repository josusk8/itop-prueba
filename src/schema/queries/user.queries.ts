import { GraphQLID, GraphQLList } from 'graphql';
import { User } from 'src/users/entities/user.entity';
import { UserType } from '../typeDefs/user.typedef';

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await User.find();
  },
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    return await User.findOne({ where: { id: args.id } });
  },
};
