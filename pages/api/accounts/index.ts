import { EventNote } from "@mui/icons-material";
import redis from "redis";

const client = redis.createClient({ url: process.env.REDIS_URL });
