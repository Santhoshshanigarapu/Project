const express = require('express');
const ocrController = require('../controllers/ocrController.js');

const router = express.Router();
/**
 * @swagger
 * /:
 *   post:
 *     summary: Upload an image for OCR processing
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *       500:
 *         description: Internal server error
 */

router.post('/', ocrController.uploadImage);

module.exports = router;
