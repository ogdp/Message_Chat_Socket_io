import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const { CLOUNDINARY_NAME, CLOUNDINARY_API_KEY, CLOUNDINARY_API_SECRET } =
  process.env;
// d9deed@gmail.com
cloudinary.config({
  cloud_name: CLOUNDINARY_NAME,
  api_key: CLOUNDINARY_API_KEY,
  api_secret: CLOUNDINARY_API_SECRET,
});

export default cloudinary;
