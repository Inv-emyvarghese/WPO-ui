import { isAxiosError } from "axios";

function messageFromResponseData(data: unknown): string | undefined {
  if (typeof data === "string" && data.trim()) {
    return data;
  }
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const message = record.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
    const error = record.error;
    if (typeof error === "string" && error.trim()) {
      return error;
    }
    const detail = record.detail;
    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }
  }
  return undefined;
}

export function extractErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const fromData = messageFromResponseData(err.response?.data);
    if (fromData) {
      return fromData;
    }
    if (err.message) {
      return err.message;
    }
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}
