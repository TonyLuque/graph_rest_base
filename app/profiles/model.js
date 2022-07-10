const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    nickname: { type: String, required: false, default: null },
    birthday: { type: Date, required: false, default: null },
    firstName: { type: String, required: false, default: null },
    lastName: { type: String, required: false, default: null },
    countryCode: { type: String, required: false, default: null },
    phoneNumber: { type: String, required: false, default: null },
    deleted: { type: Boolean, default: false },
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
  get: async function (query) {
    try {
      return await this.findOne({ ...query, deleted: false });
    } catch (error) {
      console.error("Error model get |", error);
      throw new Error(error.message);
    }
  },
  updateById: async function (id, data) {
    try {
      delete data.id;
      return await this.findOneAndUpdate({ _id: id, deleted: false }, ...data, {
        new: true,
      });
    } catch (error) {
      console.error("Error model update |", error);
      throw new Error(error.message);
    }
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
