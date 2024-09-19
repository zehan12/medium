import { sign } from "hono/utils/jwt/jwt";

export const generateAccessToken = async (
    user: any,
    accessTokenSecret: string
) => {
    console.log(user,accessTokenSecret,"both data")
    return await sign(user, accessTokenSecret);
};

export const generateRefreshToken = async (
    user: any,
    refreshTokenSecret: string
) => {
    console.log(user,refreshTokenSecret,"both data")
    return await sign(user, refreshTokenSecret);
};
