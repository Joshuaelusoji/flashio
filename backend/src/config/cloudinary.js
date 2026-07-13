import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config(); // no arguments needed — auto-reads CLOUDINARY_URL

export default cloudinary;