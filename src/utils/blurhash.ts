import { encode } from "blurhash";
import sharp from "sharp";

export async function getImageMetadata(imagePath: string) {
  try {
    // Read the image using sharp
    const imageBuffer = await sharp(imagePath).raw().ensureAlpha().toBuffer();
    const metadata = await sharp(imagePath).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Failed to get image dimensions");
    }

    // Generate blurhash
    const hash = encode(
      new Uint8ClampedArray(imageBuffer),
      metadata.width,
      metadata.height,
      4,
      4
    );

    return {
      width: metadata.width,
      height: metadata.height,
      hash,
    };
  } catch (error) {
    console.error("Error generating blurhash:", error);
    return null;
  }
}

export async function generateBase64Placeholder(imagePath: string) {
  try {
    const placeholder = await sharp(imagePath)
      .resize(20) // resize to a small size
      .blur(10) // apply blur
      .toBuffer();
    return `data:image/png;base64,${placeholder.toString("base64")}`;
  } catch (error) {
    console.error("Error generating placeholder:", error);
    return null;
  }
}
