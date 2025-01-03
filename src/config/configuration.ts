export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3000,
    DATABASE: {
      HOST: process.env.DATABASE_HOST,
      USERNAME: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
      NAME: process.env.DATABASE_NAME,
      PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  });
