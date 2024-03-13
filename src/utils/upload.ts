import multer, { MulterError } from "multer";
import path from "path";
import { Request } from "express";

interface MulterFile extends Express.Multer.File {}

const limit = {
  fileSize: 1024 * 1024 * 2, //2Mb
  // the max file size (in bytes)
  // 1kb equal to 1024
};

const storage = multer.diskStorage({
  destination: (req: Request, file: MulterFile, cb: Function) => {
    const staticFolder = "./public";
    cb(null, staticFolder);
  },

  filename: (req: Request, file: MulterFile, cb: Function) => {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req: Request, file: MulterFile, cb: Function) => {
  const validExtensions = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
    ".PNG",
    ".webm",
  ];

  const originalName = file.originalname;
  const originalExtension = path.extname(originalName);
  const isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported") as MulterError, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limit,
});

export default upload;
