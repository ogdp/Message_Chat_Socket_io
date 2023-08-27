import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
const plugins = [mongoosePaginate, mongooseDelete];
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 255,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
    },
    size: {
      type: Array,
    },
    status: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
      default: "Còn hàng",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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
  productSchema.plugin(plugin);
});
export default mongoose.model("Product", productSchema);
