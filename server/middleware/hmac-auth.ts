import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { loggerUtils } from "../logger";

const logger = loggerUtils.dbLogger;

export interface HMACPayload {
  userId: string;
  timestamp: number;
  requestData?: any;
}

export interface AuthenticatedRequest extends Request {
  userId: string;
  hmacPayload: HMACPayload;
}

const HMAC_SECRET = process.env.HMAC_SECRET!;
const HMAC_ALGORITHM = "sha256";
const MAX_TIMESTAMP_DIFF = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generate HMAC signature for a payload
 */
export function generateHMACSignature(payload: HMACPayload): string {
  const payloadString = JSON.stringify(payload);
  return crypto
    .createHmac(HMAC_ALGORITHM, HMAC_SECRET)
    .update(payloadString)
    .digest("hex");
}

/**
 * Verify HMAC signature
 */
export function verifyHMACSignature(
  payload: HMACPayload,
  signature: string
): boolean {
  const expectedSignature = generateHMACSignature(payload);
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}

/**
 * Create HMAC payload from request data
 */
export function createHMACPayload(
  userId: string,
  requestData?: any
): HMACPayload {
  return {
    userId,
    timestamp: Date.now(),
    requestData,
  };
}

/**
 * HMAC Authentication Middleware
 * Expects headers:
 * - x-hmac-signature: The HMAC signature
 * - x-hmac-payload: Base64 encoded JSON payload containing userId, timestamp, and requestData
 */
export function hmacAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Skip HMAC authentication for OPTIONS requests (CORS preflight)
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const signature = req.headers["x-hmac-signature"] as string;
    const payloadHeader = req.headers["x-hmac-payload"] as string;

    // Check if required headers are present
    if (!signature || !payloadHeader) {
      logger.warn("Missing HMAC headers in request", {
        url: req.url,
        method: req.method,
        headers: {
          hasSignature: !!signature,
          hasPayload: !!payloadHeader,
        },
      });
      return res.status(401).json({
        error: "Authentication required",
        message: "Missing HMAC signature or payload",
      });
    }

    // Decode the payload
    let payload: HMACPayload;
    try {
      const decodedPayload = Buffer.from(payloadHeader, "base64").toString(
        "utf-8"
      );
      payload = JSON.parse(decodedPayload);
    } catch (error) {
      logger.warn("Invalid HMAC payload format", {
        url: req.url,
        method: req.method,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid payload format",
      });
    }

    // Validate payload structure
    if (!payload.userId || !payload.timestamp) {
      logger.warn("Invalid HMAC payload structure", {
        url: req.url,
        method: req.method,
        payload: {
          hasUserId: !!payload.userId,
          hasTimestamp: !!payload.timestamp,
        },
      });
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid payload structure",
      });
    }

    // Check timestamp to prevent replay attacks
    const now = Date.now();
    const timeDiff = Math.abs(now - payload.timestamp);
    if (timeDiff > MAX_TIMESTAMP_DIFF) {
      logger.warn("HMAC timestamp expired", {
        url: req.url,
        method: req.method,
        userId: payload.userId,
        timeDiff,
        maxAllowed: MAX_TIMESTAMP_DIFF,
      });
      return res.status(401).json({
        error: "Authentication failed",
        message: "Request timestamp expired",
      });
    }

    // Verify the signature
    if (!verifyHMACSignature(payload, signature)) {
      logger.warn("HMAC signature verification failed", {
        url: req.url,
        method: req.method,
        userId: payload.userId,
      });
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid signature",
      });
    }

    // Optional: Verify request data integrity (for POST/PUT requests)
    if (req.method === "POST" || req.method === "PUT") {
      const requestDataString = JSON.stringify(req.body);
      const payloadDataString = JSON.stringify(payload.requestData || {});

      if (requestDataString !== payloadDataString) {
        logger.warn("Request data mismatch with HMAC payload", {
          url: req.url,
          method: req.method,
          userId: payload.userId,
        });
        return res.status(401).json({
          error: "Authentication failed",
          message: "Request data integrity check failed",
        });
      }
    }

    // Authentication successful - attach user info to request
    (req as AuthenticatedRequest).userId = payload.userId;
    (req as AuthenticatedRequest).hmacPayload = payload;

    logger.info("HMAC authentication successful", {
      url: req.url,
      method: req.method,
      userId: payload.userId,
    });

    next();
  } catch (error) {
    logger.error("HMAC authentication error", {
      url: req.url,
      method: req.method,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      error: "Authentication error",
      message: "Internal server error during authentication",
    });
  }
}

/**
 * Optional: Middleware for development that bypasses HMAC (use with caution)
 */
export function devBypassMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.BYPASS_HMAC === "true"
  ) {
    const userId = (req.headers["x-user-id"] as string) || "dev-user";
    (req as AuthenticatedRequest).userId = userId;
    (req as AuthenticatedRequest).hmacPayload = {
      userId,
      timestamp: Date.now(),
      requestData: req.body,
    };

    logger.warn("Using development HMAC bypass", {
      url: req.url,
      method: req.method,
      userId,
    });

    return next();
  }

  // If not in dev mode or bypass not enabled, use normal HMAC auth
  hmacAuthMiddleware(req, res, next);
}

// Export types and functions
export { HMAC_SECRET, HMAC_ALGORITHM, MAX_TIMESTAMP_DIFF };
