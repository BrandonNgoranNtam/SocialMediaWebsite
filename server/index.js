import express from "express"; // A web application framework for Node.js.
import bodyParser from "body-parser"; // A middleware for parsing HTTP request bodies.
import mongoose from "mongoose"; // An object data modeling (ODM) library for Node.js that makes working with MongoDB easier.
import cors from "cors"; // A middleware that allows cross-origin resource sharing (CORS).
import dotenv from "dotenv"; // A library for loading environment variables from a .env file.
import multer from "multer"; // A middleware for handling file uploads.
import helmet from "helmet"; // A middleware that helps to secure your Express application by setting HTTP headers.
import morgan from "morgan"; // A middleware that logs HTTP requests.
import path from "path"; // A built-in Node.js module for working with file paths.
import { fileURLToPath } from "url"; // A built-in Node.js function that converts a file URL to a file path.
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import User from "./models/User.js"
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js"


import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middleware/auth.js";

/* MIDDLEWARE AND PACKAGE CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get the absolute path to the current directory.
dotenv.config(); // Load the environment variables from the .env file.
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// Add middleware to parse multipart/form-data requests.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //Sets the directory of where the images will be stored (locally). Normally, we'd store it in a cloud storage like S3

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files.
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    // Set the filename for uploaded files.
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // Create a Multer instance with the storage configuration.

/* ROUTES WITH FILES*/

// Add a route to register a new user. This route will accept a file upload for the user's profile picture.
// Normally should be in the routes file but I need the upload variable
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost );

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; // Backend/Server will run on 3001 but if there's an issue, it will run on 6001
// Connect to MongoDB.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the Express server.
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */

    /* User.insertMany(users); //Manually filling the database with our dataset. MAybe you can find a way to only do this once ?
       Post.insertMany(posts);*/
       
  
  })
  .catch((error) => console.log(`${error} did not connect`));




  //TODO: comments, search user, notifications, viewed my profile, share button
  // as of version 4.16, ExpressJs has a built-in body parser meaning the "body-parser" package is no longer required.  bodyParser.json() and  bodyParser.urlencoded() should be replaced with express.json($ and express.urlencoded() respectively. 