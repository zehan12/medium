import { StatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
