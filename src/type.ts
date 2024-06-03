import { ObjectId } from "mongodb";

export type Province = {
  _id: ObjectId;
  idProvince: number;
  name: string;
};

export type District = {
  _id: ObjectId;
  idDistrict: number;
  idProvince: number;
  name: string;
};

export type Commune = {
  _id: ObjectId;
  idCommune: number;
  idDistrict: number;
  name: string;
};
