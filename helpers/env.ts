const adminUrl = process.env.ADMIN_URL ?? process.env.URL

const Env = {
  URL: process.env.URL,
  ADMIN_URL: adminUrl !== undefined && adminUrl.length > 0
    ? new URL('/admin', adminUrl).toString()
    : undefined,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}

export function requireEnv (name: string): string {
  const value = process.env[name]
  if (value === undefined || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export default Env
