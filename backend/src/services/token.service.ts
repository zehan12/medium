import { UserRepository } from "../repositories";
import catchAsync from "../utils/catchAsync";
import { generateAccessToken } from "../utils/token";
import { TokenSecretsTypes } from "./auth.service";

export const tokenService = {
    generateAccessAndRefreshTokens: catchAsync(
        async (
            dataSourceUrl: string,
            userId: number,
            tokenSecrets: TokenSecretsTypes
        ) => {
            const userRepository = new UserRepository(dataSourceUrl);
            const user = await userRepository.findById(userId);

            const payload = {
                userId: user?.id,
                email: user?.email,
                exp: 0,
            };

            const accessToken = await generateAccessToken(
                payload,
                tokenSecrets.ACCESS_TOKEN_SECRET
            );

            delete payload.email;
            payload.exp = 900000;
            // Math.floor(Date.now() / 1000) + 60 * 15;

            const refreshToken = await generateAccessToken(
                payload,
                tokenSecrets.REFRESH_TOKEN_SECRET
            );

            if (user?.refreshToken !== refreshToken) {
                await userRepository.setRefreshToken({
                    id: userId,
                    refreshToken,
                });
            }
            return { accessToken, refreshToken };
        }
    ),
};
