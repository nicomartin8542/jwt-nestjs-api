export const Configuration = () => ({
  postgresDb: process.env.POSTGRES_DB,
  postgresHost: process.env.POSTGRES_HOST || 'localhost',
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresUsername: process.env.POSTGRES_USERNAME,
  postgresPort: +process.env.POSTGRES_PORT || 5432,
  typeDb: process.env.TYPE_DB || 'postgres',
  secret: process.env.SECRET,
});
