import mongoose from "mongoose";

const FileDetailsSchema = new mongoose.Schema(
  {
    subject: String,
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    collection: "FileInfo",
  }
);

mongoose.model("FileInfo", FileDetailsSchema);
