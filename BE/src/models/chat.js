import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];
const chatSchema = new mongoose.Schema(
  {
    peopleID: {
      type: Array,
      default: [],
    },
    userID: {
      type: String,
      default: 0,
    },
    chatID: {
      type: String,
      default: "",
    },
    nameUser: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
plugins.forEach((plugin) => {
  chatSchema.plugin(plugin);
});
export default mongoose.model("Chat", chatSchema);
