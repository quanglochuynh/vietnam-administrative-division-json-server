import { Router } from "express";
import {
  communeCollection,
  districtCollection,
  provinceCollection,
} from "./configs/mongo.config";

const provinceRouter = Router();

provinceRouter.get("/provinces", (_, res) => {
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

provinceRouter.get("/districts", (req, res) => {
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

provinceRouter.get("/communes", (req, res) => {
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

export default provinceRouter;
