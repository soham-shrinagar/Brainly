import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import router from "./routes/pageRoute";
import dbConnect from "./config/db";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allowing all origins
  },
  credentials: true
}));


app.use(cookieParser());
dbConnect();

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
