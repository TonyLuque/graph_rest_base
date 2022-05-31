const User = require("./model");

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
    const users = await User.getAll();
    return users;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  user,
  users,
};
