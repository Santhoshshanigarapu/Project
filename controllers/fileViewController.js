const fs = require('fs');
const path = require('path');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const fileViewController = (req, res) => {
  // Handle the file upload
  upload.single('file')(req, res, (err) => {
    if (err) {
      // Error occurred during file upload
      res.statusCode = 500;
      res.end('Internal server error');
      return;
    }

    if (!req.file) {
      // No file was uploaded
      res.statusCode = 400;
      res.end('No file uploaded');
      return;
    }

    // Get the uploaded file path
    const filePath = req.file.path;

    // Check if the file exists
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // File doesn't exist
          res.statusCode = 404;
          res.end('File not found');
        } else {
          // Other error occurred
          res.statusCode = 500;
          res.end('Internal server error');
        }
        return;
      }

      // Set the appropriate headers
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', stats.size);

      // Stream the file to the client
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  });
};

module.exports = fileViewController;
