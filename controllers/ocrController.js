const { createWorker } = require('tesseract.js');

exports.uploadImage = async (req, res) => {
  try {
    const imagePath = req.file.path;

    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();

    res.json({ message: text });
  } catch (error) {
    console.error('Error performing OCR:', error);
    res.status(500).json({ error: 'An error occurred during OCR processing.' });
  }
};
