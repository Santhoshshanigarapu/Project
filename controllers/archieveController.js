const fs = require('fs');
const archiver = require('archiver');

async function uploadFiles(req, res) {
  try {
    // Create a new ZIP archive
    const output = fs.createWriteStream('myarchive6.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set the compression level (optional)
    });

    // Listen for archive data (optional)
    output.on('close', () => {
      console.log(`Archive created: ${archive.pointer()} total bytes`);// archieve pointer returns total no.of bytes written to o/p stream
      res.json({ message: 'Archive created successfully' });
    });

    // Listen for any errors during compression (optional)
    archive.on('error', (err) => {
      console.error('Error creating archive:', err);
      res.status(500).json({ error: 'An error occurred during archive creation.' });
    });

    // Add files to the archive
    archive.file(req.files['file2'][0].path, { name: 'file2.txt' });
    archive.file(req.files['file3'][0].path, { name: 'file3.txt' });

    // Finalize the archive and write it to the output stream
    archive.pipe(output);
    archive.finalize(); // it indicate no more data will be added
  } catch (err) {
    console.error('Error creating archive:', err);
    res.status(500).json({ error: 'An error occurred during archive creation.' });
  }
}

module.exports = {
  uploadFiles
};
