import { s3 } from "@/lib/storage.lib";
import { Upload } from "@aws-sdk/lib-storage";

export async function uploadPhoto(photo: File) {
  if (photo.size === 0) return { photoUrl: null };

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `haiku_images/${photo.name}`,
      Body: photo,
      ContentType: photo.type,
    },
  });

  const uploadResult = await upload.done();

  const photoUrl = uploadResult
    ? new URL(uploadResult.Key!, process.env.S3_PUBLIC_URL).href
    : null;

  return {
    photoUrl,
  };
}
