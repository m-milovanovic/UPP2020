module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'UPP',
  entities: ['src/entities/*.ts'],
  synchronize: true,
};
