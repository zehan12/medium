import { UserRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { sign } from "hono/jwt";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { Context } from "hono";
import { message } from "../constants/messages";
import { generateAccessToken } from "../utils/token";

export type TokenSecretsTypes = {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};

export const userService = {
    generateAccessAndRefreshTokens: catchAsync(
        async (
            dataSourceUrl: string,
            userId: number,
            tokenSecrets: TokenSecretsTypes
        ) => {
            try {
                console.log("Start generate Access Refresh Token");
                console.log("all params:", dataSourceUrl, userId, tokenSecrets);
                const userRepository = new UserRepository(dataSourceUrl);
                const user = await userRepository.findById(userId);
                console.log("Find user by id", user);
                const userObj = {
                    userId: user?.id,
                    email: user?.email,
                };

                console.log("user object", userObj);
                const accessToken = await generateAccessToken(
                    userObj,
                    tokenSecrets.ACCESS_TOKEN_SECRET
                );

                delete userObj.email;
                console.log("user object after remove email", userObj);

                const refreshToken = await generateAccessToken(
                    userObj,
                    tokenSecrets.REFRESH_TOKEN_SECRET
                );

                console.log(
                    "both tokens generated",
                    refreshToken + " --- " + accessToken
                );
                const r = await userRepository.setRefreshToken({
                    id: userId,
                    refreshToken,
                });

                console.log("updated with refresh token in db", r);

                console.log("End generate Access Refresh Token");
                return { accessToken, refreshToken };
            } catch (e) {
                console.log(e, "error during process");
            }
        }
    ),

    /**
     * @desc    Sign Up Service
     * @param   { createdUserDto } createUser - Body object data
     * @return  { Object<success|statusCode|message|data> }
     */
    signUp: catchAsync(
        async (
            dataSourceUrl: string,
            createdUserDto: CreateUserDto,
            tokenSecrets: TokenSecretsTypes
        ) => {
            const userRepository = new UserRepository(dataSourceUrl);
            const createdUser = await userRepository.create(createdUserDto);

            const jwt = await sign(
                {
                    id: createdUser.id,
                },
                tokenSecrets.REFRESH_TOKEN_SECRET
            );

            return {
                success: true,
                message: "user signup and registered",
                status: StatusCodes.CREATED,
                data: {
                    user: createdUser,
                    token: {},
                },
            };
        }
    ),

    signIn: catchAsync(
        async (
            dataSourceUrl: string,
            loginUserDto: LoginUserDto,
            tokenSecrets: {
                accessTokenSecret: string;
                refreshTokenSecret: string;
            }
        ) => {
            const userRepository = new UserRepository(dataSourceUrl);
            let userExit = await userRepository.findFirst(loginUserDto);
            if (!userExit) {
                return {
                    success: false,
                    message: message.INCORRECT_CREDENTIALS,
                    status: StatusCodes.UNAUTHORIZED,
                    data: null,
                };
            }

            const tokens = await userService.generateAccessAndRefreshTokens(
                dataSourceUrl,
                userExit.id,
                tokenSecrets
            );
            console.log(tokens);

            return {
                success: true,
                message: "user signup and registered",
                status: StatusCodes.CREATED,
                data: {
                    user: userExit,
                    tokens,
                },
            };
        }
    ),
};
