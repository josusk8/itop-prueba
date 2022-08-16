import { GraphQLObjectType, GraphQLString, GraphQLID} from 'graphql'
import { UserType } from './user.typedef'

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields:{
        id: {type: GraphQLID},
        tittle: {type: GraphQLString},
        priority: {type: GraphQLString}, 
        description: {type: GraphQLString},
        
        
    }
})