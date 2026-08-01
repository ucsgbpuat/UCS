/**
 * Centralized API configuration
 * All API calls should use this to get the backend URI
 */

export const getBackendUri = (): string => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  }
  return "";
};

export const API_BASE_URL = getBackendUri();
