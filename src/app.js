import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
mongoClient.connect()
    .then(() => {
        db = mongoClient.db();
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err.message));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));