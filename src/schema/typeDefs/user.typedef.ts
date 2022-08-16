import {GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql'
import { TaskType } from './task.typedef'

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields:{
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        password: {type: GraphQLString}, 
       
    }
})