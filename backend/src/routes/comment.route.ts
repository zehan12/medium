import { Hono } from "hono";
import { AppContext } from "../types/appContext";

const commentRouter = new Hono<AppContext>();

commentRouter.get("/", (c) => {
    // Extract the value of the slug parameter
    const slug = c.req.param("slug");

    // Use the slug value (for example, fetching comments for the article)
    return c.json({
        message: `Comments for article with slug: ${slug}`,
    });
});

export { commentRouter as commentRoutes };
