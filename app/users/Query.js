const User = require("./model");
const ErrorHandler = require("../utils/ErrorHandler");

async function user(parent, args, context, info) {
  try {
    const { id: userId } = args;
    const user = await User.get({ _id: userId });
    if (user) {
      return {
        code: 200,
        success: true,
        message: `ok`,
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
    const users = await User.getAll({});
    if (users) {
      return {
        code: 200,
        success: true,
        message: `ok`,
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
