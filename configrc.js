module.exports = {
  port: process.env.PORT || 3000,
  localDb: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
  },
  remoteDb: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
};
