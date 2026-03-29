export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database: {
    databaseUrl: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6380', 10),
    password: process.env.REDIS_PASSWORD || '',
  },
});
