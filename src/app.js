import express, { json } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
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
const tweetSchema = joi.object({
    username: joi.string().required(),
    tweet: joi.string().required()
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

app.post("/tweets", async (req, res) => {
    const { username, tweet } = req.body;
    const validation = tweetSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }

    try { 
        const authorized = !!await db.collection("users").findOne({ username });
        if (!authorized) return res.sendStatus(httpStatus.UNAUTHORIZED);
        await db.collection("tweets").insertOne({
            username,
            tweet
        });
        res.sendStatus(httpStatus.CREATED);
    }
    catch (err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    } 
});

app.get('/tweets', async (req, res) => { 
    try { 
        const tweets = await db.collection("tweets").find().toArray();
        const users = await db.collection("users").find().toArray();
        tweets.reverse();
        const tweetsToShow = tweets.map(tweet => {
            const usuario = users.find(user => user.username === tweet.username);
            return {
                ...tweet,
                avatar: usuario.avatar
            };
        });
        res.send(tweetsToShow).status(httpStatus.OK);
    }
    catch (err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    } 
});

app.put("/tweets/:id", async (req, res) => {
    const { username, tweet } = req.body;
    const { id } = req.params;
    const validation = tweetSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errors);
    }

    try { 
        const tweetToEdit = await db.collection("tweets").findOne({ _id: new ObjectId(id) });
        if (!tweetToEdit) return res.sendStatus(httpStatus.NOT_FOUND);
        if (username !== tweetToEdit.username) return res.sendStatus(httpStatus.UNAUTHORIZED);
        await db.collection("tweets").updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.sendStatus(httpStatus.NO_CONTENT);
    }
    catch (err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    } 
});


// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));