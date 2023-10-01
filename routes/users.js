import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../controllers/users.js";

import { verifyToken } from "../middlewares/auth.js";

const router =express.Router();

//READ OPERATIONS

router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

//Update Operations

router.patch("/:id/:friendId",verifyToken,addRemoveFriends);

export default router;