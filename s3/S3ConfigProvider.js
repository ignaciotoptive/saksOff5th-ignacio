// https://medium.com/geekculture/upload-image-to-aws-s3-localstack-using-nest-typescript-1104bcb5d9ec
const S3 = require('aws-sdk/clients/s3');

const BUCKET_NAME_DEFAULT = 'webstore';

const HOSTNAME_DEFAULT = 'localhost';
const PORT_DEFAULT = '4566';

const S3ConfigProvider = () => {
  const _bucketName = process.env.AWS_BUCKET_NAME ?? BUCKET_NAME_DEFAULT;
  // LocalStack instance should be running locally on port 4566
  // https://onexlab-io.medium.com/localstack-s3-e28ad393c09
  // https://qubyte.codes/blog/tip-connecting-to-localstack-s3-using-the-javascript-aws-sdk-v3
  const _s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'testAccessKey',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'testSecretKey',
    endpoint: `http://${process.env.LOCALSTACK_HOST ?? HOSTNAME_DEFAULT}:${
      process.env.LOCALSTACK_PORT ?? PORT_DEFAULT
    }`,
    s3ForcePathStyle: true,
    region: process.env.AWS_REGION ?? 'us-east-1',
    logger: console,
  });

  const getS3 = () => {
    return _s3;
  };

  const getBucketName = () => {
    return _bucketName;
  };

  const createBucket = (bucketName = BUCKET_NAME_DEFAULT) => {
    getS3().createBucket({ Bucket: bucketName }, (err, data) => {
      if (err && err.statusCode == 409) {
        console.log('Bucket has been created already');
      } else {
        console.log('Bucket Created Successfully', data.Location);
      }
    });
  };

  return {
    HOSTNAME_DEFAULT,
    PORT_DEFAULT,
    getS3,
    getBucketName,
    createBucket,
  };
};

module.exports = S3ConfigProvider;

/* Create a bucket (run this once)*/
// new S3ConfigProvider().createBucket();
