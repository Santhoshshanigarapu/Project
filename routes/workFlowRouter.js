const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workFlowController');
/**
 * @swagger
 * /workflows:
 *   get:
 *     summary: Get workflows
 *     responses:
 *       200:
 *         description: Successful operation. Returns the workflows.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   steps:
 *                     type: array
 *                     items:
 *                       type: string
 *       500:
 *         description: Internal server error
 */
router.get('/workflows', async (req, res) => {
  try {
    // Execute workflow1
    await workflowController.executeWorkflow('workflow1', (error) => {
      if (error) {
        console.error('Error executing workflow1:', error);
        throw error; // Throw the error to catch it in the catch block
      }
      // Workflow1 executed successfully, execute workflow2
      workflowController.executeWorkflow('workflow2', (error) => {
        if (error) {
          console.error('Error executing workflow2:', error);
          throw error; // Throw the error to catch it in the catch block
        }
        // Both workflows executed successfully
        res.status(200).json({ message: 'Workflows executed successfully.' });
      });
    });
  } catch (error) {
    console.error('Error executing workflows:', error);
    res.status(500).json({ error: 'Error executing workflows.' });
  }
});

module.exports = router;

