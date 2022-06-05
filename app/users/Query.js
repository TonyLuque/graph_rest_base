const User = require("./model");
const ErrorHandler = require("../utils/ErrorHandler");

const dataUsers = [
  {
    id: "1",
    name: "july",
    email: "july@falso.com",
  },
  {
    id: "2",
    name: "tony",
    email: "tony@falso.com",
  },
  {
    id: "3",
    name: "felicia",
    email: "felicia@falso.com",
  },
  {
    id: "4",
    name: "pipio",
    email: "pipio@falso.com",
  },
  {
    id: "5",
    name: "pipia",
    email: "pipia@falso.com",
  },
];

function user(parent, args, context, info) {
  return dataUsers[0];
}

async function users(parent, args, context, info) {
  try {
    const users = await User.getAll({ name: "o" });
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
