const Profile = require("../profiles/model");
const ErrorHandler = require("../utils/ErrorHandler");

async function updateProfile(parent, args, context, info) {
  try {
    const profile = await Profile.updateById(args.id, ...args);
    if (profile) {
      return {
        code: 200,
        success: true,
        message: `ok`,
        data: profile,
      };
    } else {
      return {
        code: 204,
        success: true,
        message: `Profile not found`,
        data: {},
      };
    }
  } catch (error) {
    return ErrorHandler.graphQlError({
      error: error,
      message: "update a profile",
      functionName: "updateProfile",
      fileName: "Mutation.js",
      moduleName: "profiles",
      typeDataResponse: {},
    });
  }
}

module.exports = {
  updateProfile,
};
