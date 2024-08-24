import { Context, Hono } from "hono";
import { AppContext } from "./types/appContext";
import { ENDPOINT_V1 } from "./constants";
import { authRouter } from "./routes";
import { env } from "hono/adapter";
import { errorHandler } from "./middlewares/ErrorHandler";

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
app.route(ENDPOINT_V1 + "/auth", authRouter);

// log all env vars
app.get("/env", (c: Context) => {
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
