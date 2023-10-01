import express, { Router } from "express";
import {login} from "../controllers/auth.js";

//setting up the global router for all the routes

const router=express.Router();


router.post("/login", login)

export default router;
