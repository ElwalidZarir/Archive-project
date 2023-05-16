import mongoose from "mongoose";

const FileDetailsSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    file: {
      data: Buffer,
      contentType: String,
    },
    creationDate: { type: Date, required: true },
  },
  {
    collection: "FileInfo",
  }
);

mongoose.model("FileInfo", FileDetailsSchema);
