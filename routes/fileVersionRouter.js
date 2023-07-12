const express = require('express');
const fileVersion = require('../controllers/fileVersion.js');
const uploade = require('../middleware/multer.js');

const router = express.Router();
/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *       500:
 *         description: Internal server error
 */

router.post("/upload",uploade.single('file'),fileVersion);

module.exports = router;
