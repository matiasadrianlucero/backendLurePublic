import { fileURLToPath } from 'url';
import path from 'path'
import {verifyToken} from "../verifyToken.js";
import { getProfile } from "../controllers/profile/getProfile.js";
import { getFindUser } from "../controllers/profile/getFindUser.js";
import { searchPost } from "../controllers/post/searchPosts.js";
import { searchPostsWTag } from "../controllers/post/searchPostsWTag.js";
import { retrieveFollowRequest } from "../controllers/followRequest/followRequest.js";
import { getFeed } from "../controllers/profile/getFeed.js";
import { retrieveExplorePosts } from "../controllers/post/retrieveExplorePosts.js";
import { retrieveFavourites } from "../controllers/post/favourite/retrieveFavourites.js";

import { getGallery } from "../controllers/profile/getGallery.js";
import { getComments } from "../controllers/post/comments/getComments.js";

import { retrieveUserFollowers } from "../controllers/profile/retrieveUserFollowers.js";
import { retrieveUserFollowing } from "../controllers/profile/retrieveUserFollowing.js";

import { getNotificationsPendingRequests } from "../controllers/notification/getNotificationsPendingRequests.js";

import { checkNotifications } from "../controllers/notification/checkNotifications.js";
import { retrieveSettings } from "../controllers/profile/retrieveSettings.js";
import { retrieveProfilePosts } from "../controllers/profile/retrieveProfilePosts.js";
import { Router } from "express";
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getRouter = Router();

getRouter.get('/profile/:username',
  verifyToken,
  getProfile
);
getRouter.get('/img/:folder/:name', function (req, res) {
  const folder = req.params.folder;
  const name = req.params.name;
  
  res.sendFile(path.join(__dirname,`../imgs/${folder}/${name}`)
    // , { root: '../' }
  );
});
getRouter.get('/find/:username', 
  getFindUser
);
getRouter.get('/posts/:text', 
  verifyToken,
  searchPost
);
getRouter.get('/posts/:text/:tags', 
  verifyToken,
  searchPostsWTag
);
getRouter.get('/retrieve/followRequest', 
  verifyToken,
  retrieveFollowRequest
);
getRouter.get('/retrieve/Feed', 
  verifyToken,
  getFeed
);
getRouter.get('/retrieve/Favourites', 
  verifyToken,
  retrieveFavourites
);

getRouter.get('/retrieve/Explore', 
  verifyToken,
  retrieveExplorePosts
);
getRouter.get('/retrieve/:Username/posts', 
  verifyToken,
  retrieveProfilePosts
);
getRouter.get('/retrieve/:Username/Gallery', 
  verifyToken,
  getGallery
);
getRouter.get('/retrieve/Comments/:id', 
  getComments
);
getRouter.get('/followers/:id', 
  retrieveUserFollowers
);
getRouter.get('/myFollowerList', 
  verifyToken,
  (req, res, next) => {
    req.params.id = res.locals.tojwt.id;
    next();
  },
  retrieveUserFollowers
);
getRouter.get('/myFollowList', 
  verifyToken,
  retrieveUserFollowing
);
getRouter.get('/retrieve/RequestsNotifications',
  verifyToken,
  getNotificationsPendingRequests
);
getRouter.get('/check/RequestsNotifications',
  verifyToken,
  checkNotifications
);
getRouter.get('/retrieve/Settings',
  verifyToken,
  retrieveSettings
);
export default getRouter