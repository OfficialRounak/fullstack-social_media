import express from 'express';
import {getFeedPosts,getUserPosts, likePost} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();


//getting all the posts from logged in user or any of their friends
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts", verifyToken , getUserPosts);


//updating posts

router.patch("/:userId/like", verifyToken , likePost);

export default router;


