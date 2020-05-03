import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import {User} from '../models/user.model';


export const UserModule = new GraphQLModule({
  typeDefs: gql`
    type User{
      id: ID!
      username: String!
      email: String!
    }


    type Query {
      user(id: ID!): User
      users: [User]

    }

    type Mutation{
      addUser(username: String!, email: String!): User
      deleteUser(id: ID!): User
      updateUser(id: ID!, username: String!, email: String!): User
    }
`,
  resolvers:{
    Query:{
      user: async (_, args) => {
        try {
        let response = await User.findById(args.id)
        return response;
      } catch(e) {
        return e.message;
        }
      },
      users: async () => {
        try{
          let response = await User.find({})
          return response;
        } catch(e) {
          return e.message;
        }
      }
    },
    Mutation:{
      addUser: async (parent,args) => {
        try{
          let response = await User.create(args);
          return response;
        } catch(e){
          return e.message;
        }
      },
      deleteUser: async (_, args) => {
        try {
          let response = await User.findByIdAndRemove(args.id);
          return response;
        } catch (e) {
          return e.message;
        }
      },
      updateUser: async(_, args) => {
        try {
          let response = await User.findByIdAndUpdate(
            {_id: args.id },
            {username: args.username,
            email: args.email },
            {new: true},
          )
          return response;
        } catch (e) {
            return e.message;
          }
      },
    },
    
  }
});
