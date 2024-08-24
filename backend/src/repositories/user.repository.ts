import { createPrismaClient } from "../helpers/prismaClient";

export class UserRepository {
    private prisma;

    constructor(dataSourceUrl: string) {
        this.prisma = createPrismaClient(dataSourceUrl);
    }

    async create(data: { email: string; username: string; password: string }) {
        const createdUser = await this.prisma.user.create({ data });
        return createdUser;
    }
}