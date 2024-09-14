import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const isAuthenticated = async (c: Context, next: Next) => {
    const authorizationHeader = c.req.header("authorization") || "";

    const authorizationCookie = getCookie(c, "accessToken");

    console.log(authorizationCookie,"cookies")

    if (!authorizationHeader) {
        c.status(403);
        return c.json({
            success: false,
            message: "Not Authorized, Login First.",
        });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const decodedToken = await verify(token, c.env.JWT_SECRET);
    if (decodedToken) {
        c.set("userId", decodedToken.id);
        return await next();
    } else {
        c.status(403);
        return c.json({
            success: false,
            message: "Not Authorized, Login First.",
        });
    }
};

export const isAuthenticateOptional = async (c: Context, next: Next) => {
    const authorizationHeader = c.req.header("authorization") || "";
    const user = await verify(authorizationHeader, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", user.id);
        return next();
    }
    return next();
};
