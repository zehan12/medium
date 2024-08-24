import { UserRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { sign } from "hono/jwt";
import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { Context } from "hono";
import { message } from "../constants/messages";

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
            jwtSecret: string
        ) => {
            const userRepository = new UserRepository(dataSourceUrl);
            const createdUser = await userRepository.create(createdUserDto);

            const jwt = await sign(
                {
                    id: createdUser.id,
                },
                jwtSecret
            );

            return {
                success: true,
                message: "user signup and registered",
                status: StatusCodes.CREATED,
                data: {
                    user: createdUser,
                    token: jwt,
                },
            };
        }
    ),

    signIn: catchAsync(
        async (
            dataSourceUrl: string,
            loginUserDto: LoginUserDto,
            jwtSecret: string
        ) => {
            const userRepository = new UserRepository(dataSourceUrl);
            let userExit = await userRepository.findFirst(loginUserDto);
            if (!userExit) {
                return {
                    success: true,
                    message: message.INCORRECT_CREDENTIALS,
                    status: StatusCodes.UNAUTHORIZED,
                };
            }

            const jwt = await sign(
                {
                    id: userExit.id,
                },
                jwtSecret
            );

            return {
                success: true,
                message: "user signup and registered",
                status: StatusCodes.CREATED,
                data: {
                    user: userExit,
                    token: jwt,
                },
            };
        }
    ),
};
