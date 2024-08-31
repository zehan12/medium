import slugify from "slugify";
import { ArticleRepository } from "../repositories";
import catchAsync from "../utils/catchAsync";
import { message } from "../constants/messages";
import { StatusCodes } from "http-status-codes";
import { CreateArticleDto } from "../dtos/article.dto";

export const articleService = {
    create: catchAsync(
        async (
            dataSourceUrl: string,
            authorId: string,
            createArticleDto: CreateArticleDto
        ) => {
            const articleRepository = new ArticleRepository(dataSourceUrl);
            createArticleDto.slug =
                slugify(createArticleDto.title, {
                    lower: true,
                }) + `-${Date.now().toString().slice(-4)}`;
            createArticleDto.authorId = Number(authorId);
            const createdArticle = await articleRepository.create(
                createArticleDto
            );
            return {
                success: true,
                status: StatusCodes.CREATED,
                message: message.ARTICLE_CREATED,
                data: { article: createdArticle },
            };
        }
    ),

    getAll: catchAsync(async (dataSourceUrl: string) => {
        const articleRepository = new ArticleRepository(dataSourceUrl);
        const getArticles = await articleRepository.findMany();
        return {
            success: true,
            status: StatusCodes.OK,
            message: "get all articles",
            data: { articles: getArticles },
        };
    }),

    getBySlug: catchAsync(async (dataSourceUrl: string, slug: string) => {
        const articleRepository = new ArticleRepository(dataSourceUrl);
        const article = await articleRepository.findFirst(slug);

        if (!article) {
            return {
                success: false,
                status: StatusCodes.NOT_FOUND,
                message: "Article not found!",
                data: null,
            };
        }

        return {
            success: true,
            status: StatusCodes.OK,
            message: "fetch article",
            data: { article },
        };
    }),

    update: catchAsync(
        async (dataSourceUrl: string, slug: string, updateArticleDto: any) => {
            const articleRepository = new ArticleRepository(dataSourceUrl);
            const updatedArticle = await articleRepository.update(
                slug,
                updateArticleDto
            );

            return {
                success: true,
                status: StatusCodes.OK,
                message: "article updated",
                data: { article: updatedArticle },
            };
        }
    ),

    delete: catchAsync(async (dataSourceUrl: string, slug: string) => {
        const articleRepository = new ArticleRepository(dataSourceUrl);
        await articleRepository.delete(slug);
        return {
            success: true,
            status: StatusCodes.OK,
            message: "Article Deleted",
        };
    }),
};
