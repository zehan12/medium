import { sign } from "hono/utils/jwt/jwt";

export const generateAccessToken = async (
    payload: any,
    accessTokenSecret: string
) => {
    return await sign(payload, accessTokenSecret);
};

export const generateRefreshToken = async (
    payload: any,
    refreshTokenSecret: string
) => {
    return await sign(payload, refreshTokenSecret);
};
