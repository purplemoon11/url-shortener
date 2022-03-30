import express, {Request, Response} from "express"
import env from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser'
import { createShortUrl, redirect } from "./controller/shortener";
import validateResourse from "./middleware/validateResource";
import shortUrlSchema from "./schemas/createShortUrl.Schemas";
const app = express();

//dotenv config
env.config()

//paring
app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//mongoose.connection
//mongodb+srv://node:<password>@cluster0.rkk5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
  `mongodb+srv://node:${process.env.MONGO_DB_PASSWORD}@cluster0.rkk5m.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
)

//Running the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


//connecting to frontend
app.use(cors({
  origin: `${process.env.corsOrigin}`
}));

//routess /Test Cases
app.post('/api/url',validateResourse(shortUrlSchema), createShortUrl); 
app.get('/:shortId', redirect);

  