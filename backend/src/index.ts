import { Context, Hono } from "hono";
import { AppContext } from "./types/appContext";
import { ENDPOINT_V1 } from "./constants";
import { authRouter } from "./routes";
import { env } from "hono/adapter";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    };
}>();

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

app.get("/", (c: Context) => {
    return c.json({ message: "Hello Medium" });
});

export default app;
