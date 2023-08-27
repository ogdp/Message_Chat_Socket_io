import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { deleteImage, uploadImage } from "../controllers/upImages.js";
import cloudinary from "../configs/cloudinary.js";

dotenv.config();
const {
  CLOUNDINARY_NAME_FOLDER,
  CLOUNDINARY_FORMAT_IMG,
  CLOUNDINARY_FILE_KEY,
} = process.env;
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: CLOUNDINARY_NAME_FOLDER,
    format: CLOUNDINARY_FORMAT_IMG,
  },
});

const upload = multer({ storage: storage });

router.post(
  "/images/upload",
  upload.array(CLOUNDINARY_FILE_KEY, 10),
  uploadImage
);
router.delete("/images/:publicId", deleteImage);

export default router;
