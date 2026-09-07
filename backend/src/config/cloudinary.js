import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryUrl = new URL(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: cloudinaryUrl.hostname,
  api_key: cloudinaryUrl.username,
  api_secret: cloudinaryUrl.password,
  secure: true,
});

export default cloudinary;