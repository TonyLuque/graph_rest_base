const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        name: String
        email: String
    }

    type Query {
        user: User
        users: [User]
    }
`;

const users = [
    {
        name: "july",
        email: "july@falso.com",
    },
    {
        name: "tony",
        email: "tony@falso.com",
    },
];

const resolvers = {
    Query: {
        user: () => users[0],
        users: () => users,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});
server
    .listen()
    .then(({ url }) => console.log(`Server run at ${url}`))
    .catch((e) => console.error(e));
