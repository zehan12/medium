import { Context } from "hono";
import { userService } from "../services";

const createUserHandler = async (c: Context) => {
    try {
        const { status, success, message, data } = await userService.signUp(
            c.env.DATABASE_URL,
            await c.req.json(),
            c.env.JWT_SECRET
        );
        c.status(status);
        return c.json({ success, message, data });
    } catch (error: unknown) {
        throw error;
    }
};

const loginUserHandler = async (c: Context) => {
    try {
        const { status, success, message, data } = await userService.signIn(
            c.env.DATABASE_URL,
            await c.req.json(),
            c.env.JWT_SECRET
        );

        if (!success) {
            c.status(status);
            return c.json({ success, message, data });
        }

        c.status(status);
        return c.json({ success, message, data });
    } catch (error: unknown) {
        throw error;
    }
};

export const authController = {
    createUserHandler,
    loginUserHandler,
};
