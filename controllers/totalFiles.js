const files = require("../models/fileSchema");

const getTotalFiles = async (req, res) => {
  try {
    // Getting all files from DB
    const totalFiles = await files.find();
    totalFiles
      ? res.status(200).json({ status: "ok", data: totalFiles })
      : res.status(400).json({
          status: "failed",
          message: "Requested files are not available",
        });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error });
  }
};

module.exports = {
  getTotalFiles,
};
