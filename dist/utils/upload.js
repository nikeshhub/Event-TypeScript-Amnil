"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const limit = {
    fileSize: 1024 * 1024 * 2, //2Mb
    // the max file size (in bytes)
    // 1kb equal to 1024
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const staticFolder = "./public";
        cb(null, staticFolder);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname;
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
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
    const originalExtension = path_1.default.extname(originalName);
    const isValidExtension = validExtensions.includes(originalExtension);
    if (isValidExtension) {
        cb(null, true);
    }
    else {
        cb(new Error("File is not supported"), false);
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: limit,
});
exports.default = upload;
