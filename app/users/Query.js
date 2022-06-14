const User = require("./model");
const ErrorHandler = require("../utils/ErrorHandler");

async function user(parent, args, context, info) {
  const { user } = context;
  try {
    const user = await User.get({ _id: args.id });
    if (user) {
      return {
        code: 200,
        success: true,
        message: ``,
        data: user,
      };
    } else {
      return {
        code: 204,
        success: true,
        message: `User not found`,
        data: {},
      };
    }
  } catch (error) {
    return ErrorHandler.graphQlError({
      error: error,
      message: "get a user",
      functionName: "user",
      fileName: "Query.js",
      moduleName: "users",
      typeDataResponse: {},
    });
  }
}

async function users(parent, args, context, info) {
  try {
    const { user } = context;

    const users = await User.getAll({});
    if (users) {
      return {
        code: 200,
        success: true,
        message: ``,
        data: users,
      };
    } else {
      return {
        code: 204,
        success: true,
        message: `There is not users`,
        data: [],
      };
    }
  } catch (error) {
    return ErrorHandler.graphQlError({
      error: error,
      message: "get all users",
      functionName: "users",
      fileName: "Query.js",
      moduleName: "users",
      typeDataResponse: [],
    });
  }
}

module.exports = {
  user,
  users,
};
