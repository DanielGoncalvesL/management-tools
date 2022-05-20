export const env = {
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'tj67O==5H',
  nodeEnv: process.env.TS_NODE_DEV ? 'dev' : 'prod',
};
