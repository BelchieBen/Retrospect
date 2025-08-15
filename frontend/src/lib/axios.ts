/**
 * Drop-in replacement for axios with HMAC authentication
 *
 * Usage: Simply replace your axios imports with this file:
 *
 * Before:
 * import axios from 'axios';
 *
 * After:
 * import axios from '~/lib/axios';
 *
 * All your existing axios code will now automatically use HMAC authentication!
 */

import hmacAxios from "./hmac-axios";

// Export the HMAC-enabled axios instance as default
export default hmacAxios;

// Also export it as 'axios' for named imports
export { hmacAxios as axios };

// Re-export everything else from the original axios for compatibility
export * from "axios";
