const config = {
  migrate: false,
  hostname: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3666',
  storagePathBase: process.cwd() + '/public/images/product/',
};

module.exports = config;
