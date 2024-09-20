import { UserRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { sign } from "hono/jwt";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { Context } from "hono";
import { message } from "../constants/messages";
import { generateAccessToken } from "../utils/token";
import { tokenService } from "./token.service";

export type TokenSecretsTypes = {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};

export const userService = {
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

            const tokens = await tokenService.generateAccessAndRefreshTokens(
                dataSourceUrl,
                userExit.id,
                tokenSecrets
            );

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
