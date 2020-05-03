import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import {Career} from '../models/career.model';
import {UserModule} from './user.module';

export const CareerModule = new GraphQLModule({
  typeDefs: gql`
    type Career{
      id:ID!
      careerName: String!
      description: String!
      prerquisite: Career
    }

    type User{
      careerPosted: [Career]
    }

    type Query{
      career(id:ID!): Career
      careers: [Career]
    }

    type Mutation{
      addCareer(careerName: String!, description: String!, prerequisite: String): Career
      deleteCareer(id:ID!): Career
      updateCareer(id:ID!, careerName: String, description: String, prerequisite: String): Career
    }
  `,
  resolvers:{
    Query: {
      career: async (_, args) => await Career.findById(args.id).exec(),
      careers: async () => await Career.find({}).exec(),
    },
    Mutation: {
      addCareer: async(parent,args) => {
        try{
          let response = await Career.create(args);
          return response;
        } catch (e) {
          return e.message;
        }
      },
      deleteCareer: async (_,args) => {
        try{
          let response = await Career.findByIdAndRemove(args.id);
          return response;
        } catch(e) {
          return e.message;
        }
      },
      updateCareer: async (_,args) => {
        try {
          let response = await Career.findByIdAndUpdate({_id:args.id},
          {description:args.description,
          prerequisite:args.prerequisite},
          {new:true},
          )
        return response;
      } catch(e){
        return e.message;
        }
      },
    },
  }
  imports: [UserModule]
});
