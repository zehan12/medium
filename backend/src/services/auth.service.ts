import { UserRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { sign } from "hono/jwt";

export const userService = {
    /**
     * @desc    Sign Up Service
     * @param   { dto } createUser - Body object data
     * @return  { Object<success|statusCode|message|data> }
     */
    signup: catchAsync(
        async (dataSourceUrl: string, dto: any, jwtSecret: string) => {
            const userRepository = new UserRepository(dataSourceUrl);
            const createdUser = await userRepository.create(dto);

            const jwt = await sign(
                {
                    id: createdUser.id,
                    name: createdUser.username
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
};
