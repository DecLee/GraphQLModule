//import 'graphql-import-node';
import {GraphQLModule} from '@graphql-modules/core';
import { ApolloServer, gql } from 'apollo-server-express';
import {UserModule} from './modules/user.module';
import {CareerModule} from './modules/career.module';
//import { User } from './models/user.model';
const express = require('express');
require('./config');


const AppModule = new GraphQLModule({
  imports:[ UserModule, CareerModule ]
});

const server = new ApolloServer ({
  schema: AppModule.schema,
  context: AppModule.context,
  //introspection:true
});

const app = express();
server.applyMiddleware({ app });
app.listen({port: 8000}, () => {
  console.log(`Apollo Server ready on http://localhost:8000${server.graphqlPath}`);
});
