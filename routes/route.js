const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { array } = require('joi');
const { roles } = require('../roles');
/**
 * @swagger
 * /admin/profile:
 *   get:
 *     summary: Get admin profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns the admin profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin route
 *       401:
 *         description: Unauthorized. Authentication credentials are missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have permission to access the admin profile.
 *       500:
 *         description: Internal server error
 */
// Admin route
router.get('/admin/profile', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), (req, res) => {
  // Only admin users can access this route
  res.status(200).json({ message: 'Admin route' });
});
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns the user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User route
 *       401:
 *         description: Unauthorized. Authentication credentials are missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have permission to access the user profile.
 *       500:
 *         description: Internal server error
 */
router.get('/user/profile', userController.allowIfLoggedin, userController.grantAccess('readOwn', 'profile'), (req, res) => {
  // All users can access this route
  res.status(200).json({ message: 'User route' });
});
/**
 * @swagger
 * /supervisor/profile:
 *   get:
 *     summary: Get supervisor profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns the supervisor profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Supervisor route
 *       401:
 *         description: Unauthorized. Authentication credentials are missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have permission to access the supervisor profile.
 *       500:
 *         description: Internal server error
 */
// Supervisor route
router.get('/supervisor/profile', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), (req, res) => {
  // Only supervisor users can access this route
  res.status(200).json({ message: 'Supervisor route' });
});
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

 /**
   * @swagger
   * /signup:
   *   post:
   *     summary: Create a new user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               role: 
   *                type: string
   *                _id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: User created Successfully....
   *       400:
   *         description: Bad request
   */
router.post('/signup', userController.signup);
 /**
   * @swagger
   * /login:
   *   post:
   *     summary: login a user
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               role: 
   *                type: string
   *                _id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: User Login Successfully....
   *       400:
   *         description: Bad request
   */
router.post('/login', userController.login);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [User]
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All Users....
 *       401:
 *         description: Unauthorized....
 */
  
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
/**
 * @swagger
 * /users/user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdatePayload'
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Invalid access token
 *       404:
 *         description: User not found
 *
 * components:
 *   schemas:
 *     UserUpdatePayload:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 */

 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);
 /**
 * @swagger
 * /users/user/{id}:
 *   delete:
 *     summary: Delete  a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdatePayload'
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User Deleted  successfully
 *       401:
 *         description: Unauthorized - Invalid access token
 *       404:
 *         description: User not found
 *
 * components:
 *   schemas:
 *     UserUpdatePayload:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 */
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);
/**
 * @swagger
 * /changePassword:
 *   post:
 *     summary: Change password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request - Invalid payload
 *       401:
 *         description: Unauthorized - Invalid access token
 *       404:
 *         description: User not found
 *
 * components:
 *   schemas:
 *     ChangePasswordRequest:
 *       type: object
 *       properties:
 *         currentPassword:
 *           type: string
 *         newPassword:
 *           type: string
 */

router.post('/changePassword', userController.changePassword);
/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Unauthorized - Invalid access token
 *       404:
 *         description: User not found
 *
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         # Add more properties as needed
 */

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);
module.exports = router;