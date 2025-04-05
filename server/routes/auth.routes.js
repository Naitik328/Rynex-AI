import express from "express";
import {
	login,
	logout,
	signup,
	checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import passport from "passport";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


const authRouter = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login',successRedirect:'/chat' }),
  (req, res) => {
    // Generate JWT token and set cookie
    generateTokenAndSetCookie(res, req.user._id);
    
    // Update last login
    req.user.lastLogin = new Date();
    req.user.save();
    
    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL || '/');
  }
);

// GitHub OAuth routes
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT token and set cookie
    generateTokenAndSetCookie(res, req.user._id);
    
    // Update last login
    req.user.lastLogin = new Date();
    req.user.save();
    
    // Redirect to frontend
    res.redirect(process.env.FRONTEND_URL || '/');
  }
);



export default authRouter;