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
import bcrypt from "bcrypt";
import "./userDetails.js";
import "./fileDetails.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const JWT_SECRET = "whwhwhhwuiqol,cnd@wioo82@ewsd400@rdkdjks@";
mongoose
  .connect(
    "mongodb+srv://walid:uv6FXdAoXpoVuHTs@cluster0.uys2oeb.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => console.log(e));

const User = mongoose.model("UserInfo");
const File = mongoose.model("FileInfo");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  const { file, subject } = req.body;
  try {
    await File.create({ file, subject });
    console.log(req.file);
    res.json({ status: "Single File upload success" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.json({ status: "User Exists" });
    } else {
      await User.create({ username, password: encryptedPassword });
      res.send({ status: "ok" });
      console.log("good");
    }
  } catch (error) {
    res.send({ status: "errowwr" });
    console.log("bad");
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.get("/files", async (req, res) => {
  try {
    const files = await File.find({});
    res.send({ status: "ok", data: files });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("server started");
});
