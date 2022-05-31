const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();
const httpServer = http.createServer(app);

require("dotenv").config();
const PORT = process.env.PORT;

const auth = require("./auth/Routes");
const { getUserId } = require("./auth/auth");

app.use("/user", auth);

const userQuery = require("./users/Query");
const userMutation = require("./users/Mutation");
const profileQuery = require("./profiles/Query");

const resolvers = {
  Query: {
    ...userQuery,
    ...profileQuery,
  },

  Mutation: {
    ...userMutation,
  },
  // Subscription,
};

const typeDefs = [
  fs.readFileSync(path.join(__dirname, "./users/schema.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "./profiles/schema.graphql"), "utf8"),
];

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: ({ req }) => {
      return {
        ...req,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
