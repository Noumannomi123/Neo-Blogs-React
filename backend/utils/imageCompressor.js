import { Buffer } from "buffer";
import sharp from "sharp";
const reduceImageSize = async (originalImage, sizeX, sizeY, q) => {
    const buffer = Buffer.from(originalImage, 'base64');
    const compressedBuffer = await sharp(buffer)
        .resize(sizeX, sizeY)
        .jpeg({ quality: q })
        .toBuffer();
    return compressedBuffer.toString('base64');
}

export { reduceImageSize }