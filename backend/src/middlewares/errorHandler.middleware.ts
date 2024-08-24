import { Context } from "hono";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
    err: any,
    c: Context
): Response | Promise<Response> => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Handle Prisma errors
    if (err.code === "P2002") {
        // Unique constraint violation (duplicate entry)
        const message = `Duplicate entry for ${err.meta.target.join(", ")}`;
        c.status(400);
        return c.json({ success: false, message });
    } else if (err.code === "P2003") {
        // Foreign key constraint violation
        const message = `Foreign key constraint failed on the field: ${err.meta.field_name}`;
        c.status(400);
        return c.json({ success: false, message });
    } else if (err.code === "P2004") {
        // The query failed
        const message = `Query failed: ${err.meta.message}`;
        c.status(400);
        return c.json({ success: false, message });
    } else if (err.code === "P2005") {
        // The data in the query is invalid
        const message = `Invalid data: ${err.meta.message}`;
        c.status(400);
        return c.json({ success: false, message });
    } else if (err.code === "P2025") {
        // Record to delete does not exist
        const message = `Record to delete not found: ${err.meta.model}`;
        c.status(404);
        return c.json({ success: false, message });
    } else if (err.code === "P2020") {
        // Relation not found
        const message = `Relation not found for ${err.meta.relation}`;
        c.status(404);
        return c.json({ success: false, message });
    }

    // Fallback for unexpected errors
    console.error("Unexpected error:", err);
    c.status(err.statusCode);
    return c.json({ success: false, message: "Internal server error" });
};
