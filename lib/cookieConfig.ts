export function cookieDomain() {
  return process.env.NODE_ENV === "production"
    ? ".luxaiautomation.com"
    : undefined;
}

export function cookieSecure() {
  return process.env.NODE_ENV === "production";
}
