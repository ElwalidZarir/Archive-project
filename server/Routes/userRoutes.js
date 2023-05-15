import "../userDetails.js";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const User = mongoose.model("UserInfo");
const JWT_SECRET = "whwhwhhwuiqol,cnd@wioo82@ewsd400@rdkdjks@";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.json({ status: "User Exists" });
    }
    await User.create({ username, password: encryptedPassword });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
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

export default User;
