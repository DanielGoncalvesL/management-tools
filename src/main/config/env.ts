const mongoHost = process.env.RUN_DOCKER ? 'mongo' : 'localhost';

export const env = {
  port: process.env.API_PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H',
  nodeEnv: process.env.TS_NODE_DEV ? 'dev' : 'prod',
  mongoUrl:
    process.env.MONGO_URL ??
    `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${mongoHost}:27017/management-tools?authSource=admin`,
};
