import  express  from "express";
import { login } from "../controllers/auth.js"

const router = express.Router();

// /auth will be prefixed unto the diffrent routes here thanks to app.use("/auth",authRoutes) in index.js

router.post("/login", login);

export default router;