export const ironOptions = {
  cookieName: "job_cookiename",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
