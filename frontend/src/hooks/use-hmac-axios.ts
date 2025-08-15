/**
 * React hook for using HMAC-authenticated Axios client
 * Automatically manages user ID from session
 */

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import hmacAxios from "~/lib/hmac-axios";

/**
 * Hook that automatically sets up HMAC authentication based on user session
 */
export function useHMACAxios() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      // Set user ID for HMAC authentication
      hmacAxios.setUserId(session.user.id);
    } else {
      // Clear user ID when not authenticated
      hmacAxios.clearUserId();
    }
  }, [session?.user?.id]);

  return hmacAxios;
}

/**
 * Hook that returns the HMAC axios instance and authentication status
 */
export function useAuthenticatedAxios() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      hmacAxios.setUserId(session.user.id);
    } else {
      hmacAxios.clearUserId();
    }
  }, [session?.user?.id]);

  return {
    axios: hmacAxios,
    isAuthenticated: !!session?.user?.id,
    isLoading: status === "loading",
    userId: session?.user?.id,
  };
}
