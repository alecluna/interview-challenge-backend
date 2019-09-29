import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import db from "./models";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db }
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/src"));

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
