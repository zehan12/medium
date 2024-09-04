import { Context, Hono } from "hono";
import { AppContext } from "./types/appContext";
import { ENDPOINT_V1 } from "./constants";
import { authRoutes, articleRoutes, commentRoutes } from "./routes";
import { env } from "hono/adapter";
import { errorHandler, isAuthenticated } from "./middlewares";

const app = new Hono<AppContext>();

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. 
| Prefix the routes with the version endpoint (e.g., "/api/v1").
| Make something great!
|
*/
app.route(ENDPOINT_V1 + "/auth", authRoutes);
app.route(ENDPOINT_V1 + "/article", articleRoutes);
app.route(ENDPOINT_V1 + "/article/:slug/comments", commentRoutes);

// log all env vars
app.get("/env", isAuthenticated, (c: Context) => {
    return c.json({ env: env(c) });
});

/*
 * Define a route for the root path ("/")
 * using the HTTP GET method to check if the server is running
 */
app.get("/", (c: Context) => {
    return c.json({ message: "server is working" });
});

// Middleware to handle errors in the application
app.onError(errorHandler);

export default app;
