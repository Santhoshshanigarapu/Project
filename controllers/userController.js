const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Schema= require("../Validators/validator");
const { roles } = require('../roles')
 
const validatePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Password validation error');
  }
};

// Function to hash the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Password hashing error');
  }
};
exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const result = await Schema.validateAsync(req.body);
    console.log(result);
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user"
    });

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    newUser.accessToken = accessToken;
    await newUser.save();

    res.json({
      data: newUser,
      accessToken
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
     })
    } catch (error) {
     next(error);
    }
   }
exports.getUsers = async (req, res, next) => {
    try {
      const {page = 1,limit=10}= req.query;
      const users = await User.find({})
      .limit(limit *1)
      .skip((page-1)*limit);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
    
   exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }
   exports.grantAccess = function(action, resource) {  //action (representing the action to be performed, e.g., "read" or "write") 
    return async (req, res, next) => {//resource (representing the resource on which the action is to be performed, e.g., "user" or "post").
     try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }
    
   exports.allowIfLoggedin = async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     if (!user)
      return res.status(401).json({
       error: "You need to be logged in to access this route"
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
   }
   exports.changePassword = async (req, res, next) => {
    try {
      const { email, currentPassword, newPassword } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Validate the current password
      const isPasswordValid = await validatePassword(currentPassword, user.password);
      console.log(currentPassword, newPassword);
      console.log(user.password);
     if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid current password' });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  };
  