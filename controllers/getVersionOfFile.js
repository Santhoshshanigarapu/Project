const { version } = require("mongoose");
const file = require("../models/fileSchema");

const getVersionOfFile = async (req, res) => {
  try {
    console.log(req.query);
    let findFile = req.query.filename;
    let version_num = req.query.version.split(".")[2];
    console.log(version_num);
    //checking if the file exists or not
    let fileExist = await file.findOne({ filename: findFile });

    if (fileExist) {
      //decoding the file name to the original file name  
      let originalFile =
        fileExist.updatedFiles[version_num].split("@")[0] +
        "." +
        findFile.split(".")[1];
      console.log(originalFile);
      let filePath = `C:/Users/Admin/Documents/All files/Project-s/Uploads/${originalFile}`;
      //checking if the requested file version is present or not
      version_num < fileExist.updatedFiles.length
        ? res.status(200).json({ data: fileExist.updatedFiles[version_num], file: filePath })
        : res.status(400).json({
            status: "failed",
            message: "requested version is not available",
          });
    } else {
      res.status(404).json({ status: "failed", message: "file not found" });
    }
  } catch (err) {
    res.status(500).json({ status: "failed", message: err });
  }
};

module.exports = {
  getVersionOfFile,
};
