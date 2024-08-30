import { CreateArticleDto } from "../dtos/article.dto";
import { createPrismaClient } from "../helpers/prismaClient";

export class ArticleRepository {
    private prisma;

    constructor(dataSourceUrl: string) {
        this.prisma = createPrismaClient(dataSourceUrl);
    }

    async findMany() {
        const articles = await this.prisma.article.findMany();
        return articles;
    }

    async create(createArticleDto: CreateArticleDto) {
        const createdArticle = await this.prisma.article.create({
            data: createArticleDto,
        });
        return createdArticle;
    }

    async findFirst(slug: string) {
        const article = await this.prisma.article.findFirst({
            where: {
                slug,
            },
        });
        return article;
    }

    async update(slug: string, updateArticleDto: any) {
        const updatedArticle = await this.prisma.article.update({
            where: {
                slug,
            },
            data: updateArticleDto,
        });
        return updatedArticle;
    }

    async delete(slug: string) {
        return await this.prisma.article.delete({
            where: {
                slug,
            },
        });
    }
}
