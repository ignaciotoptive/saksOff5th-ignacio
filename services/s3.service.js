// https://medium.com/geekculture/upload-image-to-aws-s3-localstack-using-nest-typescript-1104bcb5d9ec
import S3ConfigProvider from 's3/S3ConfigProvider';

export default class uploadImageService {
  constructor() {
    this.s3Provider = S3ConfigProvider();
  }

  upload(file) {
    const { originalName } = file;
    const S3bucket = this.s3Provider.getBucketName();
    return this.uploadS3(file.buffer, S3bucket, originalName);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.s3Provider.getS3();
    const s3Params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };

    const data = await this.uploadImageToS3(s3, s3Params);
    console.log('Uploaded file to S3:', data);
    return data;
  }

  uploadImageToS3(s3, s3Params) {
    return new Promise((resolve, reject) => {
      s3.upload(s3Params, (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
