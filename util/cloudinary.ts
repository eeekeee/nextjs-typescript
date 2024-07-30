import { v2 as cloudinary } from "cloudinary";

// community.cloudinary.com/discussion/289/upload-image-to-cloudinary-using-next-js-app-router

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(
  base64Image: string
): Promise<string> {
  try {
    const base64Data = base64Image.split(",")[1]; // 데이터 URL에서 Base64 데이터 추출
    const buffer = Buffer.from(base64Data, "base64"); // Base64 데이터를 Buffer로 변환

    // Cloudinary에 업로드
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        })
        .end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}
