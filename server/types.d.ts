import { Request } from "express";
import { type Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      logger: Logger;
      hmacPayload?: {
        userId: string;
        timestamp: number;
        requestData?: any;
      };
    }
  }
}

declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}
