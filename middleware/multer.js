const multer = require("multer");
const fs = require("fs");
const path = require("path");
//defining the storagfe
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("C:/Users/Admin/Documents/All files/Project-s/Uploads")) {
      fs.mkdirSync("C:/Users/Admin/Documents/All files/Project-s/Uploads");
    }
    cb(null, "C:/Users/Admin/Documents/All files/Project-s/Uploads");
  },
  //encrypting the file name  of uploaded file
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
//config the storage to the multer
const uploade = multer({ storage: storage });
module.exports = uploade;
