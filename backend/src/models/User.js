const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      min: 8,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: [`user`, `admin`],
      default: `user`,
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (req, res, next) {
  const hashed_Password = await bcryptjs.hash(this.password, 10);
  this.password = hashed_Password;
});

UserSchema.methods = {
  authenticate: function (password) {
    return bcryptjs.compare(password, this.hash_Password);
  },
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
