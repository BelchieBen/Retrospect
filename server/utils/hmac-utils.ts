import crypto from "crypto";

// Re-export types and functions for convenience
export {
  generateHMACSignature,
  createHMACPayload,
  verifyHMACSignature,
  type HMACPayload,
  HMAC_SECRET,
  HMAC_ALGORITHM,
} from "../middleware/hmac-auth";

/**
 * Utility function to create authenticated request headers
 * This can be used by your frontend to generate the required headers
 */
export function createAuthHeaders(
  userId: string,
  requestData?: any
): {
  "x-hmac-signature": string;
  "x-hmac-payload": string;
} {
  const payload = {
    userId,
    timestamp: Date.now(),
    requestData,
  };

  const signature = crypto
    .createHmac("sha256", process.env.HMAC_SECRET || "your-fallback-secret-key")
    .update(JSON.stringify(payload))
    .digest("hex");

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64"
  );

  return {
    "x-hmac-signature": signature,
    "x-hmac-payload": encodedPayload,
  };
}

/**
 * Test utility function to validate HMAC implementation
 */
export function testHMACImplementation(): {
  success: boolean;
  message: string;
  example?: any;
} {
  try {
    const testUserId = "test-user-123";
    const testData = { message: "Hello World", timestamp: Date.now() };

    // Generate headers
    const headers = createAuthHeaders(testUserId, testData);

    // Decode and verify
    const decodedPayload = Buffer.from(
      headers["x-hmac-payload"],
      "base64"
    ).toString("utf-8");
    const payload = JSON.parse(decodedPayload);

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.HMAC_SECRET || "your-fallback-secret-key"
      )
      .update(decodedPayload)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(headers["x-hmac-signature"], "hex"),
      Buffer.from(expectedSignature, "hex")
    );

    return {
      success: isValid,
      message: isValid
        ? "HMAC implementation is working correctly"
        : "HMAC verification failed",
      example: {
        headers,
        payload,
        expectedSignature,
        actualSignature: headers["x-hmac-signature"],
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `HMAC test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Frontend utility (to be copied to your Next.js app)
 * This is the implementation you'll need in your frontend
 */
export const frontendHMACUtils = `
// Frontend HMAC Utils for Next.js
// Copy this to your frontend codebase

interface HMACPayload {
  userId: string;
  timestamp: number;
  requestData?: any;
}

export function createAuthHeaders(userId: string, requestData?: any): {
  "x-hmac-signature": string;
  "x-hmac-payload": string;
} {
  const payload: HMACPayload = {
    userId,
    timestamp: Date.now(),
    requestData,
  };

  // Note: You'll need to implement HMAC generation in your frontend
  // You can use crypto-js or similar library for browser compatibility
  // const CryptoJS = require('crypto-js');
  // const signature = CryptoJS.HmacSHA256(JSON.stringify(payload), process.env.NEXT_PUBLIC_HMAC_SECRET || '').toString();
  
  const signature = ""; // Implement using crypto-js or Web Crypto API
  const encodedPayload = btoa(JSON.stringify(payload));

  return {
    "x-hmac-signature": signature,
    "x-hmac-payload": encodedPayload,
  };
}

// Example usage in your API calls:
// const headers = createAuthHeaders(session.user.id, requestBody);
// const response = await fetch('/api/members/teams', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     ...headers,
//   },
//   body: JSON.stringify(requestBody),
// });
`;

/**
 * Development helper to generate test signatures
 */
export function generateTestSignature(
  userId: string,
  requestData?: any
): {
  curl: string;
  headers: Record<string, string>;
  payload: any;
} {
  const headers = createAuthHeaders(userId, requestData);
  const payload = JSON.parse(
    Buffer.from(headers["x-hmac-payload"], "base64").toString("utf-8")
  );

  const curlCommand = `curl -X POST http://localhost:8000/members/teams \\
  -H "Content-Type: application/json" \\
  -H "x-hmac-signature: ${headers["x-hmac-signature"]}" \\
  -H "x-hmac-payload: ${headers["x-hmac-payload"]}" \\
  -d '${JSON.stringify(requestData || {})}'`;

  return {
    curl: curlCommand,
    headers,
    payload,
  };
}
