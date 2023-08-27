import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 6,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 255,
    },
    gender: {
      type: String,
      default: "male",
    },
    address: {
      type: String,
      minLength: 6,
      maxLength: 255,
    },
    tel: {
      type: String,
    },
    refreshToken: {
      type: Array,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  userSchema.plugin(plugin);
});
export default mongoose.model("User", userSchema);
