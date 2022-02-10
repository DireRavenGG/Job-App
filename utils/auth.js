import express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import redis from "redis";
var app = express();

const SESSION_SECRET = "ASDFASDF";
app.set("trust proxy", 1);
const redisClient = redis.createClient({
  port: 8000,
  host: "localhost",
});
const RedisStore = connectRedis(session);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "zid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    },
  })
);

app.post("/login", (req, res) => {
  const { username, password } = req;

  req.session.clientId;
});

export {};
