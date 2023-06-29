import mongoose from "mongoose";

const FileDetailsSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    file_path: {
      type: String,
      required: true,
    },
    creationDate: { type: Date, required: true },
    file_mimetype: {
      type: String,
      required: true,
    },
    uploader: { type: String },
    size: {
      type: Number,
    },
    lastModifiedDate: {
      type: Date,
    },
    comment: { type: String },
  },
  { timestamps: true },
  {
    collection: "FileInfo",
  }
);

mongoose.model("FileInfo", FileDetailsSchema);
