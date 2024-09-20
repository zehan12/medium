import { Context } from "hono";
import { userService } from "../services";
import { setCookie } from "hono/cookie";

const options: any = {
    path: "/",
    secure: true,
    // domain: "example.com",
    httpOnly: true,
    maxAge: 1000,
    expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
    sameSite: "Strict",
};

const createUserHandler = async (c: Context) => {
    try {
        const { status, success, message, data } = await userService.signUp(
            c.env.DATABASE_URL,
            await c.req.json(),
            c.env.TOKEN_SECRETS
        );
        c.status(status);
        return c.json({ success, message, data });
    } catch (error: unknown) {
        throw error;
    }
};

const loginUserHandler = async (c: Context) => {
    try {
        console.log(c.env);
        const { status, success, message, data } = await userService.signIn(
            c.env.DATABASE_URL,
            await c.req.json(),
            c.env.TOKEN_SECRETS
        );

        if (!success) {
            c.status(status);
            return c.json({ success, message, data });
        }

        c.status(status);
        setCookie(c, "accessToken", data.tokens.accessToken, options);
        setCookie(c, "refreshToken", data.tokens.refreshToken, options);
        return c.json({ success, message, data });
    } catch (error: unknown) {
        throw error;
    }
};

export const authController = {
    createUserHandler,
    loginUserHandler,
};
