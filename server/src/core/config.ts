const Config: Record<string, string> = {
  PORT: process.env.PORT!,
  ENV: process.env.ENV!,
  DOMAIN: process.env.DOMAIN!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: process.env.DB_PORT!,
  DB_NAME: process.env.DB_NAME!,
  JWT_KEY: process.env.JWT_KEY!,
  TEST_EMAIL: process.env.TEST_EMAIL!
}

export default Config
