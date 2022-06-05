const Profile = require("./model");

function profile(parent, args, context) {
  return {
    nickname: "oa porolas",
  };
}

module.exports = {
  profile,
};
