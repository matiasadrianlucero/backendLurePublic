import {checkBodyErrors} from "../checkBodyErrors.js";
import {verifyToken} from "../verifyToken.js";

import { loginUser } from "../controllers/landing/loginUser.js";
import { registerUser } from "../controllers/landing/registerUser.js";

import { sendFollowRequest } from "../controllers/followRequest/sendFollowRequest.js";
import { cancelFollowRequest } from "../controllers/followRequest/cancelFollowRequest.js";
import { unfollowUser } from "../controllers/followRequest/unfollowUser.js";
import { respondFollowRequest } from "../controllers/followRequest/respondFollowRequest.js";
import { createPost } from "../controllers/post/createPost.js";
import { commentPost } from "../controllers/post/comments/commentPost.js";
import { likePost } from "../controllers/post/likes/likePost.js";
import { favouritePost } from "../controllers/post/favourite/favouritePost.js";

import {body} from 'express-validator'

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import multer from 'multer'
import { Router } from "express";
let upload

const postRouter = Router();
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'../src/imgs/' + req.headers['folder']);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.')[1]
    let name=`${file.fieldname}-${uniqueSuffix}.${ext}`
    req.filenames.push(name)
    cb(null, name)

  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1 
  }
})

upload=multer({storage})


postRouter.post('/register',
    body('registerUsername').trim().notEmpty().withMessage("Username must be entered.").escape().isLength({max:20,min:1}).withMessage("User name must be 1 to 20 characters long."),
    body('registerEmail').trim().notEmpty().withMessage("Email must be entered.").escape().isEmail().withMessage("Incorrect email formating."),
    body('registerPassword').trim().notEmpty().withMessage("Password must be entered.").escape().isLength({min:6}).withMessage("Password must be at least 6 characters long."),
    checkBodyErrors,
    registerUser
);
postRouter.post('/login',
    body('loginEmail').escape().notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    body('loginPassword').escape().notEmpty().withMessage("A password must be entered"),
    checkBodyErrors,
    loginUser
);
postRouter.post('/upload/Post',
  verifyToken,
  body('text').trim().escape(),
  body('tags').trim().escape(),
  (req,res,next)=>{
    req.filenames=[]
    next()
  },
  upload.array('files',3), 
  checkBodyErrors,
  createPost 
);
postRouter.post('/send/followRequest',
  verifyToken,
  body('userToFollow').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  sendFollowRequest
);
postRouter.post('/cancel/followRequest',
  verifyToken,
  body('userToUnfollow').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  cancelFollowRequest
);
postRouter.post('/unfollow',
  verifyToken,
  unfollowUser
);
postRouter.post('/respond/followRequest',
  verifyToken,
  body('response').trim().escape().notEmpty().withMessage("Invalid request formating."),
  checkBodyErrors,
  respondFollowRequest
);
postRouter.post('/comment/Post', 
  verifyToken,
  body('comment').isLength({ min: 0, max:70 }).trim().escape().withMessage("Incorrect comment formating."),
  checkBodyErrors,
  commentPost
);
postRouter.post('/like/Post', 
  verifyToken,
  likePost
);
postRouter.post('/favourite/Post', 
  verifyToken,
  favouritePost
);
postRouter.post('/check/login',
  verifyToken,
  (req,res)=>{
    res.status(200).send("loggedIn")
  }
);
export default postRouter