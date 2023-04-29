import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import "./userDetails.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://walid:uv6FXdAoXpoVuHTs@cluster0.uys2oeb.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => console.log(e));

const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({ email, password });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.listen(3001, () => {
  console.log("server started");
});
