"use-strict";
import { dotenvConfig } from "./configs/dotenv.config";
dotenvConfig();
import express from "express";
import { connectMongoDB } from "./configs/mongo.config";

connectMongoDB();

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello world",
  });
});

app.get("/provinces", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all provinces",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
