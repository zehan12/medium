// src/helpers/prismaClient.ts
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrismaClient = (datasourceUrl: string): PrismaClient => {
    return new PrismaClient({
        datasourceUrl,
    }).$extends(withAccelerate()) as unknown as PrismaClient;
};
