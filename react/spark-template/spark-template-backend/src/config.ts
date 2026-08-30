import "dotenv/config"

const required = (name: string, fallback?: string) => {
  const value = process.env[name] ?? fallback
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

export const config = {
  port: Number(process.env.PORT ?? 3100),
  database: {
    host: required("DB_HOST", "127.0.0.1"),
    port: Number(process.env.DB_PORT ?? 3306),
    username: required("DB_USERNAME"),
    password: required("DB_PASSWORD"),
    database: required("DB_DATABASE", "fairy_vip_notes"),
  },
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://127.0.0.1:5000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
}
