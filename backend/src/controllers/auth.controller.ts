import { Context } from "hono";
import { userService } from "../services";

const createUserHandler = async (c: Context) => {
    try {
        const { status, success, message, data } = await userService.signup(
            c.env.DATABASE_URL,
            await c.req.json(),
            c.env.JWT_SECRET
        );
        c.status(status);
        return c.json({ success, message, data });
    } catch (error: any) {
        throw error;
    }
};

export const authController = {
    createUserHandler,
};
