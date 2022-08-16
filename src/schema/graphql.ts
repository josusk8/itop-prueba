import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_USERS, GET_USER } from "./queries/user.queries";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "./mutations/user.mutations";
import { GET_ALL_TASKS, GET_TASK } from "./queries/task.queries";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./mutations/task.mutations";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUser:GET_USER,
    getAllTasks: GET_ALL_TASKS,
    getTask:GET_TASK,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER,
    createTask: CREATE_TASK,
    deleteTask: DELETE_TASK,
    updateTask: UPDATE_TASK,

  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
