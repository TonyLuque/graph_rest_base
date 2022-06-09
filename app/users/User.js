const Profile = require("./model");

async function profile(parent, args, context) {
  return await Profile.findById(parent.id);
}

module.exports = {
  profile,
};
