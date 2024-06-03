import { config } from "dotenv";

export function dotenvConfig() {
  config({
    path: ".env",
  });
}
