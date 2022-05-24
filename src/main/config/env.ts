export const env = {
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H',
  nodeEnv: process.env.TS_NODE_DEV ? 'dev' : 'prod',
  mongoUrl:
    process.env.MONGO_URL ??
    'mongodb://root:management-tools@localhost:27017/management-tools?authSource=admin',
};
