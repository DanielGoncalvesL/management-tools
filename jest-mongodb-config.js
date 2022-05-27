module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.2.20',
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: 'jest',
    },
  },
};
