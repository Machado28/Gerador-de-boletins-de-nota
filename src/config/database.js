module.exports = {
  dialect: 'postgres',
  type: 'postgres',
  host: process.env.DB_HOST_DEV,
  username: 'postgres',
  port: process.env.DB_PORT_DEV,
  password: 'heneses',
  database: process.env.DB_DATABASE_DEV || 'DB-GB-DEV',
  define: {
    timestamps: true,
    undercored: true,
    undercoredAll: true,
  },
};
