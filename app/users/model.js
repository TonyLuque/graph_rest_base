const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    profile: { type: mongoose.Types.ObjectId, ref: "Profile" },
    userDeviceId: { type: String, default: null },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.static({
  create: async function (data) {
    try {
      const user = new this(data);
      return await user.save();
    } catch (error) {
      console.error("Error model create |", error);
      throw new Error(error.message);
    }
  },
  get: async function (query) {
    try {
      return await this.findOne({ ...query, deleted: false }, { password: 0 });
    } catch (error) {
      console.error("Error model get |", error);
      throw new Error(error.message);
    }
  },
  getAll: async function (query) {
    try {
      return await this.find({ ...query, deleted: false }, { password: 0 });
    } catch (error) {
      console.error("Error model getAll |", error);
      throw new Error(error.message);
    }
  },
});

module.exports = mongoose.model("User", UserSchema);
