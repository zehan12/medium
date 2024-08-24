import { Hono } from "hono";
import { AppContext } from "../types/appContext";
import { authController } from "../controllers";

export const authRouter = new Hono<AppContext>();

// @route     POST api/v1/auth/sign-up
// @desc      create and register user
// @access    Public
authRouter.post("/sign-up", authController.createUserHandler);
