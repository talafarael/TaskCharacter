export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database: {
    databaseUrl: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
});
