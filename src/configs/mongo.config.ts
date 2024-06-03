import { MongoClient, Db, Collection } from "mongodb";
import { Province, District, Commune } from "../type";

const client = new MongoClient(String(process.env.MONGODB_URI));

export let db: Db;
export let provinceCollection: Collection<Province>;
export let districtCollection: Collection<District>;
export let communeCollection: Collection<Commune>;

export async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(process.env.MONGODB_DBNAME);
    provinceCollection = db.collection("provinces");
    districtCollection = db.collection("districts");
    communeCollection = db.collection("communes");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}
