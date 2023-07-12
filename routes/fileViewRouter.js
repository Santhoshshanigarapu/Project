const express = require('express');
const router = express.Router();
const fileViewController = require('../controllers/fileViewController');
/**
 * @swagger
 * /:
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
// Handle file upload
router.post('/', fileViewController);

module.exports = router;
