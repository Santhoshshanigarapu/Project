const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
const ocrRoute = require('./routes/ocrRoute');
const archieveRouter = require('./routes/archieveRouter');
const fileViewRouter= require('./routes/fileviewRouter.js');
const workFlowRouter= require('./routes/workFlowRouter');
const fileVersionRouter= require('./routes/fileVersionRouter')
const totalFilesRouter= require('./routes/totalfilesRouter');
const getVersion= require('./routes/getVersionRouter');
const cors = require("cors")
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
 
dotenv.config();
 
const app = express();
const uploade = multer({ dest: 'uploads/' });
app.use('/api/uploade', uploade.single('uploadedImage'), ocrRoute);
app.use('/api/archieve', archieveRouter);
app.use('/api/fileview', fileViewRouter);
app.use('/totalfiles', totalFilesRouter);
app.use('/files', getVersion);
app.use(workFlowRouter);
app.use( fileVersionRouter);
app.use(cors());
app.use(express.json());
require("./db/connection")
 
const PORT = process.env.PORT 
 
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1]; // Extract the token from the "Authorization" header
    
    const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
    } 
    
    res.locals.loggedInUser = await User.findById(userId);
    next(); 
  } else { 
    next(); 
  } 
});
const options = {
  swaggerDefinition: {    
      openapi: '3.0.0',
      info: {
        title: 'API DOCUMENTATION',
        version: '1.0.0',
        description: 'API documentation using Swagger'
      },
      servers: [
        {
          url: 'http://localhost:5000'
        }
      ],
    components: {
        securitySchemes: {
          BearerAuth: {
            bearerFormat: 'JWT',
            scheme: 'bearer',
            type: 'http',
          },
        },
      },

    security: [
        {
      BearerAuth: []
    }
  ],
apis: ['./routes/*.js'],
  },
    apis: ['./routes/*.js'] // Path to the API route files
  };

 const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/', routes); 
app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})