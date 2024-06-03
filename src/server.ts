"use-strict";
import { dotenvConfig } from "./configs/dotenv.config";
dotenvConfig();
import express from "express";
import { connectMongoDB } from "./configs/mongo.config";
import provinceRouter from "./router";
import cors from "cors";

connectMongoDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://konglass.com",
      "https://kalacandela.com",
      "https://congngheoct.com",
      "https://ongchutu.com",
    ],
  })
);

app.use("/province-api", provinceRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
