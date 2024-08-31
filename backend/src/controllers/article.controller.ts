import { Context } from "hono";
import { articleService } from "../services";

const getArticlesHandler = async (c: Context) => {
    try {
        const { success, status, message, data } = await articleService.getAll(
            c.env.DATABASE_URL
        );
        c.status(status);
        return c.json({
            success,
            message,
            data,
        });
    } catch (error) {
        throw error;
    }
};

const createArticleHandler = async (c: Context) => {
    try {
        const { success, status, message, data } = await articleService.create(
            c.env.DATABASE_URL,
            c.get("userId"),
            await c.req.json()
        );
        c.status(status);

        return c.json({
            success,
            message,
            data,
        });
    } catch (error: unknown) {
        console.log(error);
        throw error;
    }
};

const getSingleArticleHandler = async (c: Context): Promise<any> => {
    try {
        const { success, status, message, data } =
            await articleService.getBySlug(
                c.env.DATABASE_URL,
                c.req.param("slug")
            );

        if (!success) {
            c.status(status);
            return c.json({
                success,
                message,
                data,
            });
        }
        c.status(status);
        return c.json({
            success,
            message,
            data,
        });
    } catch (error: unknown) {
        return error;
    }
};

const updateArticleHandler = async (c: Context) => {
    try {
        const { success, status, message, data } = await articleService.update(
            c.env.DATABASE_URL,
            c.req.param("slug"),
            await c.req.json()
        );
        c.status(status);

        return c.json({
            success,
            message,
            data,
        });
    } catch (error) {
        throw error;
    }
};

const deleteArticleHandler = async (c: Context) => {
    try {
        const { success, status, message } = await articleService.delete(
            c.env.DATABASE_URL,
            c.req.param("slug")
        );

        c.status(status);
        return c.json({
            success,
            message,
        });
    } catch (error) {
        throw error;
    }
};

export const articleController = {
    getArticlesHandler,
    createArticleHandler,
    getSingleArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
};
