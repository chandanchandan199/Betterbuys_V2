import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Null is for error we dont have any so passing null
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else cb("Images with file type jpg/jpeg/png only");
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  // The actual upload is already being handled by 'upload.single(' ')' middleware we are just sending response

  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
    // I guess when that middleware 'upload.single(' ')' is run it will automatically store file details in req and we can be fetching path and other details from it
  });
});

export default router;
