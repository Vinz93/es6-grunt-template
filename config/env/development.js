exports default {
  env: 'development',
  host: process.env.MY_SERVER_HOST || 'http://127.0.0.1',
  path: '/',
  basePath: '/',
  port: 3000,
  basePort: 3000,
  db: 'mongodb://localhost/test',
}
