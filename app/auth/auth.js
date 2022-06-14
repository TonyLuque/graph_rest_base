const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const APP_SECRET = process.env.APP_SECRET;

const User = require("../users/model");

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

async function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      const user = await User.findById(userId, "-password");
      return user;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    const user = await User.findById(userId, "-password");
    return user;
  }

  throw new Error("Not authenticated");
}

function authUser(context) {
  const { userId } = context;
  if (userId === null) {
    throw new Error("Not authenticated");
  }
  return userId;
}

module.exports = {
  APP_SECRET,
  getUserId,
  authUser,
};
