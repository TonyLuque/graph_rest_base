const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: false, unique: true },
    birthday: { type: Date, required: false, default: null },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    countryCode: { type: String, required: false, default: null },
    phoneNumber: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

ProfileSchema.static({
  create: async function (data) {
    try {
      const profile = new this(data);
      return await profile.save();
    } catch (error) {
      console.error("Error model create |", error);
      throw new Error(error.message);
    }
  },
  get: async function (id) {
    try {
      return await this.findById(id);
    } catch (error) {
      console.error("Error model get |", error);
      throw new Error(error.message);
    }
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
