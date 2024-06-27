import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import httpStatus from "http-status";
import joi from "joi";

const app = express();
app.use(cors());
app.use(json());
dotenv.config();


// DB Connection
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
mongoClient.connect()
    .then(() => {
        db = mongoClient.db();
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err.message));


// Schemas
const userSchema = joi.object({
     username: joi.string().required().trim(),
     avatar: joi.string().required().trim()
});


// Endpoints
app.post('/sign-up', async (req, res) => {
    const { username, avatar } = req.body;
    const validation = userSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }

    try { 
        await db.collection("users").insertOne({
            username,
            avatar
        });
        res.sendStatus(httpStatus.CREATED);
    }
    catch (err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    } 
});


// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));