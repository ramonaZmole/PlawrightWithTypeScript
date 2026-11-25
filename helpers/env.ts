const adminUrl = process.env.ADMIN_URL || process.env.URL;

export default class Env {
  public static readonly URL = process.env.URL;
  public static readonly ADMIN_URL = adminUrl ? new URL("/admin", adminUrl).toString() : undefined;
  public static readonly ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  public static readonly ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
}