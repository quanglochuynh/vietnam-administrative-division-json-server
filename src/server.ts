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

connectMongoDB();

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello world",
  });
});

app.get("/provinces", (_, res) => {
  provinceCollection
    .find({})
    .toArray()
    .then((provinces) => {
      res.status(200).json(provinces);
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
});

app.get("/districts", (req, res) => {
  const { idProvince } = req.query;
  if (!idProvince) {
    return res.status(400).json({
      success: false,
      message: "Missing provinceId",
    });
  }
  districtCollection
    .find({ idProvince: String(idProvince) })
    .toArray()
    .then((districts) => {
      res.status(200).json(districts);
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
});

app.get("/communes", (req, res) => {
  const { idDistrict } = req.query;
  if (!idDistrict) {
    return res.status(400).json({
      success: false,
      message: "Missing districtId",
    });
  }
  communeCollection
    .find({ idDistrict: String(idDistrict) })
    .toArray()
    .then((communes) => {
      res.status(200).json(communes);
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
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
