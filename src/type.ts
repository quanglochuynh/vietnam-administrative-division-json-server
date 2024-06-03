import { ObjectId } from "mongodb";

export type Province = {
  _id: ObjectId;
  idProvince: string;
  name: string;
};

export type District = {
  _id: ObjectId;
  idDistrict: string;
  idProvince: string;
  name: string;
};

export type Commune = {
  _id: ObjectId;
  idCommune: string;
  idDistrict: string;
  name: string;
};
