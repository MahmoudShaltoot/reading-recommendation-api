export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
      HOST: process.env.DATABASE_HOST,
      USERNAME: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
      NAME: process.env.DATABASE_NAME,
      PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432
    },
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    REDIS_USERNAME: process.env.REDIS_USERNAME || 'default',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
  });
