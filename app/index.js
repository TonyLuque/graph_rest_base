const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();
const httpServer = http.createServer(app);

require("dotenv").config();
const PORT = process.env.PORT;

require("./database");

const auth = require("./auth/Routes");
const { getUserId } = require("./auth/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", auth);

const userQuery = require("./users/Query");
const userMutation = require("./users/Mutation");
const profileQuery = require("./profiles/Query");
const profileMutation = require("./profiles/Mutation");

const User = require("./users/User");

const resolvers = {
  Query: {
    ...userQuery,
    ...profileQuery,
  },

  Mutation: {
    ...userMutation,
    ...profileMutation,
  },
  User,

  // Subscription,
};

const typeDefs = [
  fs.readFileSync(path.join(__dirname, "./schema.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "./users/schema.graphql"), "utf8"),
  fs.readFileSync(path.join(__dirname, "./profiles/schema.graphql"), "utf8"),
];

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: async ({ req }) => {
      try {
        // get the user token from the headers
        const token = req.headers.authorization || "";

        // try to retrieve a user with the token
        const user = await getUserId(req, token);

        // optionally block the user
        // we could also check user roles/permissions here
        if (!user) throw new AuthenticationError("you must be logged in");
        // add the user to the context
        return { user };
      } catch (error) {
        throw new AuthenticationError(error);
      }
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
