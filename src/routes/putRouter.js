import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Router } from "express";
import {verifyToken} from '../verifyToken.js';
import {checkBodyErrors} from '../checkBodyErrors.js';
import {body} from 'express-validator'

import { acceptFollowRequest } from '../controllers/followRequest/acceptFollowRequest.js';
import { denyFollowRequest } from '../controllers/followRequest/denyFollowRequest.js';
import { updateEmail } from '../controllers/profile/update/updateEmail.js';

import { updateBio } from '../controllers/profile/update/updateBio.js';
import { updatePrivacy } from '../controllers/profile/update/updatePrivacy.js';
import { updateUsername } from '../controllers/profile/update/updateUsername.js';
import { updatePassword } from '../controllers/profile/update/updatePassword.js';
import { updateAvatar } from '../controllers/profile/update/updateAvatar.js';
import { updateBackground } from '../controllers/profile/update/updateBackground.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import multer from 'multer'

let upload
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

const putRouter = Router();
putRouter.put('/accept/FollowRequest',
  verifyToken,
  body('username').notEmpty().escape().withMessage("A password must be entered"),
  acceptFollowRequest
);
putRouter.put('/deny/FollowRequest',
  verifyToken,
  body('username').notEmpty().escape().withMessage("A password must be entered"),
  denyFollowRequest
);
putRouter.put('/update/Email',
    body('updateEmail').escape().notEmpty().withMessage("An email must be entered").isEmail().trim().withMessage("Incorrect email formating."),
    checkBodyErrors,
    verifyToken,
    updateEmail
);
putRouter.put('/update/Bio',
  body('bio').trim().isLength({max:100}).escape().withMessage("Too Long."),
  checkBodyErrors,
  verifyToken,
  updateBio
);
putRouter.put('/update/Privacy',
    verifyToken,
    updatePrivacy
);
putRouter.put('/update/Username',
  body('updateUsername').trim().notEmpty().escape().withMessage("A username must be entered.")
  .isLength({max:20,min:1}).withMessage("User name must be 1 to 20 characters long."),
  verifyToken,
  checkBodyErrors,
  updateUsername
);
putRouter.put('/update/Password',
  body('updatePasswordUpdate').notEmpty().escape().withMessage("A password must be entered").isLength({min:6}).escape().withMessage("Password must be at least 6 characters long."),
  body('updatePasswordCurrent').notEmpty().escape().withMessage("A password must be entered").escape().isLength({min:6}).withMessage("Password must be at least 6 characters long."),
  verifyToken,
  updatePassword
);
putRouter.put('/update/Avatar',
  verifyToken,
  (req,res,next)=>{
    req.filenames=[]
    next()
  },
  upload.single('updateAvatarFile'),
  updateAvatar,
);
putRouter.put('/update/Background',
  verifyToken,
  (req,res,next)=>{
    req.filenames=[]
    next()
  },
  upload.array('updateBackgroundFile',1), 
  
  updateBackground,
);
export default putRouter