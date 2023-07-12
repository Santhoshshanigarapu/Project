const file = require("../models/fileSchema");
var fs = require("fs");
let fileVersion= async (req, res) => {
  try {
    //reading the data from the file
    fs.readFile(
      `C:/Users/Admin/Documents/All files/Project-s/Uploads/${req.file.filename}`,
      async (err, buffer) => {
        if (err) {
          res
            .status(500)
            .json({
              status: "failde",
              message: "failed in reading the the datas form the file",
              error: err,
            });
        } else {
          // finding the length of the data
          let uploadedFile = buffer.toString().length;
          // checking  for file exist in DB
          const exist = await file.findOne({ filename: req.file.originalname });

          if (exist) {
            console.log(exist.updatedFiles.length);
            //decoging the file name  of previous file
            let previousFile =
              exist.updatedFiles[exist.updatedFiles.length - 1].split("@")[0] +
              "." +
              req.file.originalname.split(".")[1];
            console.log(previousFile);
            fs.readFile(
              `C:/Users/Admin/Documents/All files/Project-s/Uploads/${previousFile}`,
              (err, buffer) => {
                if (err) {
                  res
                    .status(500)
                    .json({
                      status: "failde",
                      message: "failed in reading the the datas form the file",
                      error: err,
                    });
                } else {
                  console.log(
                    " file from db  length of file is",
                    buffer.toString().length,
                    "from uploaded",
                    uploadedFile
                  );
                  if (buffer.toString().length === uploadedFile) {
                    res.status(200).json({
                      status: "ok",
                      message: `file uploaded  but nothing is modified  @v^1.0.${
                        exist.version.length - 1
                      }`,
                    });
                  } else {
                    console.log("from exist", exist);
                    //creating the new file name with version
                    newFileName =
                      req.file.filename.split(".")[0] +
                      "@v^1.0." +
                      exist.version.length +
                      "." +
                      req.file.filename.split(".")[1];
                    //updating to existing DB object
                    exist.version = [
                      ...exist.version,
                      `@v^1.0.${exist.version.length}`,
                    ];
                    exist.updatedFiles = [...exist.updatedFiles, newFileName];
                    exist.save();
                    res
                      .status(200)
                      .json({ status: "ok updated", data: newFileName });
                  }
                }
              }
            );
          } else {
            newFileName =
              req.file.filename.split(".")[0] +
              "@v^1.0.0" +
              "." +
              req.file.filename.split(".")[1];
            //if file not exist in DB adding then we are adding file to the DB
            let newFile = new file({
              filename: req.file.originalname,
              updatedFiles: [newFileName],
              version: ["@v^1.0.0"],
            });
            newFile.save();
            res.status(200).json({ status: "ok added", data: newFileName });
          }
        }
      }
    );
    //checking if file exist in Database
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", Message: "internal server error  " + err });
  }
};
module.exports = fileVersion;
