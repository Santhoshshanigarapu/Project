const express = require('express');
const router = express.Router();

const {  getTotalFiles } = require('../controllers/totalfiles');
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get total number of files
 *     responses:
 *       200:
 *         description: Successful operation. Returns the total number of files.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Internal server error
 */

router.get('/',  getTotalFiles);

module.exports = router;
