import { Context, Hono } from "hono";
import { AppContext } from "./types/appContext";
import { ENDPOINT_V1 } from "./constants";
import { authRoutes, articleRoutes, commentRoutes } from "./routes";
import { env } from "hono/adapter";
import { errorHandler, isAuthenticated } from "./middlewares";
import { cors } from "hono/cors";

const app = new Hono<AppContext>();

app.use(
    "/*",
    cors()
    //     {
    //     origin: "http://example.com",
    //     allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    //     allowMethods: ["POST", "GET", "OPTIONS"],
    //     exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    //     maxAge: 600,
    //     credentials: true,
    // }
);

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
