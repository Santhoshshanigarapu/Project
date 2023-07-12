const express = require('express');
const router = express.Router();
const { getVersionOfFile } = require('../controllers/getVersionOfFile');
/**
 * @swagger
 * /version:
 *   get:
 *     summary: Get the version of a file
 *     responses:
 *       200:
 *         description: Successful operation. Returns the version of the file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get('/version', getVersionOfFile);

module.exports = router;
