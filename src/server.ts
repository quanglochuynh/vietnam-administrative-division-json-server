"use-strict";
import { dotenvConfig } from "./configs/dotenv.config";
dotenvConfig();
import express from "express";
import {
  communeCollection,
  connectMongoDB,
  districtCollection,
  provinceCollection,
} from "./configs/mongo.config";
import provinceRouter from "./router";

connectMongoDB();

const app = express();

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
