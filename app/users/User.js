const Profile = require("../profiles/model");

async function profile(parent, args, context) {
  return await Profile.findById(parent.profile);
}

module.exports = {
  profile,
};
