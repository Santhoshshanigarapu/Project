const express = require('express');
const multer = require('multer');
const archieveController = require('../controllers/archieveController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
/**
 * @swagger
 * /:
 *   post:
 *     summary: Upload multiple files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file2:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               file3:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *       500:
 *         description: Internal server error
 */

router.post('/', upload.fields([{ name: 'file2' }, { name: 'file3' }]), archieveController.uploadFiles);

module.exports = router;
