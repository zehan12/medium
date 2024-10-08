import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { createPrismaClient } from "../helpers/prismaClient";

export class UserRepository {
    private prisma;

    constructor(dataSourceUrl: string) {
        this.prisma = createPrismaClient(dataSourceUrl);
    }

    async create(data: CreateUserDto) {
        const createdUser = await this.prisma.user.create({ data });
        return createdUser;
    }

    async findFirst(data: LoginUserDto) {
        let userExits = null;
        if (data.email) {
            userExits = await this.prisma.user.findFirst({
                where: {
                    username: data.username,
                    password: data.password,
                },
            });
        } else {
            userExits = await this.prisma.user.findFirst({
                where: {
                    username: data.username,
                    password: data.password,
                },
            });
        }
        return userExits;
    }

    async setRefreshToken({
        id,
        refreshToken,
    }: {
        id: number;
        refreshToken: string;
    }) {
        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                refreshToken,
            },
        });
        if (!user) return null;
        return user;
    }

    async findById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) return null;
        return user;
    }
}
