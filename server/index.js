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

import { dirname } from "path";

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
  const { subject, creationDate, lastModifiedDate, uploader } = req.body;
  const { path, mimetype, size } = req.file;
  try {
    await File.create({
      subject,
      file_path: path,
      file_mimetype: mimetype,
      creationDate,
      size: size,
      lastModifiedDate: lastModifiedDate,
      uploader,
    });
    res.json({ status: "Single File upload success" });
    console.log(req.file);
  } catch (error) {
    res.send({ status: "error" });
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  const { username, password, email, userType, role } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.json({ status: "User Exists" });
    } else {
      await User.create({
        username,
        password: encryptedPassword,
        email,
        userType,
        role,
      });
      res.send({ status: "ok" });
      console.log("good");
    }
  } catch (error) {
    res.send({ status: "error" });
    console.log("bad");
    console.log(error);
  }
});

/* app.post("/file/:id",async(req,res)=>{
  try{
    const id = req.params.id
  }
})
 */
app.get("/user/:id", async (req, res) => {
  User.find({ _id: req.params.id }, function (err, docs) {
    if (err) res.json(err);
    else res.render("show", { user: docs[0] });
  });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ status: "ok", data: users });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/files/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await File.deleteOne({ _id: id });
    res.status(200).send({ success: true, msg: "file deleted successfully" });
    console.log("mzian");
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
    console.log("nari");
  }
});

app.post("/login", async (req, res) => {
  const { username, password, userType } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  let data = "walid";

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

/* app.get("/download/:id", async (req, res) => {

}); */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

app.listen(3001, () => {
  console.log("server started", __dirname);
});
