import im from 'imagemagick';
import crypto from 'crypto';
import fs from 'fs';
import s3service from '@/services/s3.service';
import config from '../config';

const DEFAULT_IMAGE_SIZE = 250;

function resizeImage({
  sourcePath,
  destinationPath,
  width = DEFAULT_IMAGE_SIZE,
  height = DEFAULT_IMAGE_SIZE,
  callback = () => null,
}) {
  im.crop(
    {
      srcPath: sourcePath,
      dstPath: destinationPath,
      width,
      height,
    },
    function (err, stdout, stderr) {
      if (!err) {
        console.log(
          `Image from ${sourcePath} has been resized in ${destinationPath} to a size of ${width}x${height}`
        );
      }
      return callback(err);
    }
  );
}

function storeImage({ imageFile }) {
  const sourcePath = imageFile.filepath;
  const imageName = crypto.randomBytes(8).toString('hex');
  const [fileExtension] = imageFile.originalFilename.split('.').slice(-1);
  const imageFileName = `${imageName}.${fileExtension}`;
  const storagePath = config.storagePathBase + imageFileName;
  return new Promise((resolve, reject) => {
    resizeImage({
      sourcePath,
      destinationPath: storagePath,
      callback: async (err) => {
        if (err) {
          return reject(err);
        }
        const newFile = fs.readFileSync(storagePath);
        const uploadImageService = new s3service();
        const uploadedImage = await uploadImageService.upload({
          buffer: newFile,
          originalName: imageFileName,
        });
        const url = uploadedImage.Location;
        return resolve({
          url,
          width: DEFAULT_IMAGE_SIZE,
          height: DEFAULT_IMAGE_SIZE,
        });
      },
    });
  });
}

module.exports = {
  resizeImage,
  storeImage,
};
