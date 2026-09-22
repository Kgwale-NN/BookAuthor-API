import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error for debugging
    console.error('Error:', err);

    // Handle AppError instances
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                status: err.statusCode
            }
        });
    }

    // Handle validation errors from express-validator
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: {
                message: 'Validation failed',
                status: 400
            }
        });
    }

    // Handle JSON parsing errors
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: {
                message: 'Invalid JSON payload',
                status: 400
            }
        });
    }

    // Default to 500 Internal Server Error
    res.status(500).json({
        error: {
            message: 'Internal server error',
            status: 500
        }
    });
};

export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    });
};