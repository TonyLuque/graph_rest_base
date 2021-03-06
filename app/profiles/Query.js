const Profile = require("../profiles/model");
const ErrorHandler = require("../utils/ErrorHandler");

async function profile(parent, args, context, info) {
  try {
    const { id: profileId } = args;
    const profile = await Profile.get({ _id: profileId });

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
      message: "get a profile",
      functionName: "profile",
      fileName: "Query.js",
      moduleName: "profiles",
      typeDataResponse: {},
    });
  }
}

module.exports = {
  profile,
};
