import { dotenvConfig } from "../src/configs/dotenv.config";
dotenvConfig();
import { connectMongoDB, db } from "../src/configs/mongo.config";
import { readFileSync } from "fs";

async function main() {
  await connectMongoDB();
  if (!db) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
  // drop all collections if exist
  try {
    await db.collection("provinces").drop();
    await db.collection("districts").drop();
    await db.collection("communes").drop();
  } catch (error) {
    console.error("Error dropping collections: ", error);
  }

  const raw = readFileSync("db.json", "utf-8");
  const data = JSON.parse(raw);
  console.log(data["province"][0]);

  // insert data to collections
  await db.collection("provinces").insertMany(data["province"]);
  await db.collection("districts").insertMany(data["district"]);
  await db.collection("communes").insertMany(data["commune"]);
  await db.collection("districts").createIndex({ idProvince: 1 });
  await db.collection("communes").createIndex({ idDistrict: 1 });

  process.exit(0);
}

main().finally(() => {
  console.log("Done");
});
