import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dgc9p61lb",
  api_key: "582283774841743",
  api_secret: "rAgcpT4gpXLYOeBEPN0ZxtVDMuw",
});

export const uploadImagen = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "ImagenesPWEB",
  });
};

export const deleteImagen = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};
