import { Context, Hono } from "hono";
import { AppContext } from "../types/appContext";
import { articleController } from "../controllers";
import { isAuthenticated, isAuthenticateOptional } from "../middlewares";

const articleRouter = new Hono<AppContext>();

articleRouter.post(
    "/",
    isAuthenticated,
    articleController.createArticleHandler
);

articleRouter.get("/", isAuthenticated, articleController.getArticlesHandler);

articleRouter.get(
    "/:slug",
    isAuthenticated,
    articleController.getSingleArticleHandler
);

articleRouter.put(
    "/:slug",
    isAuthenticated,
    articleController.updateArticleHandler
);

articleRouter.delete(
    "/:slug",
    isAuthenticated,
    articleController.deleteArticleHandler
);

articleRouter.get("/feed", isAuthenticateOptional);

articleRouter.get("/", (c) => {
    return c.json({ route: "api is working!" });
});

export { articleRouter as articleRoutes };
