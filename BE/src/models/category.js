import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 255,
      require: true,
    },
    // images: {
    //   type: String,
    //   default: "",
    // },
    // productId: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     default: "",
    //     ref: "Product",
    //   },
    // ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);
