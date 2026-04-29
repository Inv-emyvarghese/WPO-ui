import type { SeverityLevel } from "./SeverityBadge";

type StatusBadge = { level: SeverityLevel; displayText: string };

export function getStatusBadgeProps(status: string): StatusBadge {
  if (status === "Very High") {
    return { level: "Very High", displayText: "Very High" };
  }
  if (status === "High") {
    return { level: "High", displayText: "High" };
  }
  if (status === "Moderate") {
    return { level: "Moderate", displayText: "Moderate" };
  }
  if (status === "Low") {
    return { level: "Low", displayText: "Low" };
  }
  if (status === "Recognized") {
    return { level: "High", displayText: "Recognized" };
  }
  if (status === "Partial") {
    return { level: "Moderate", displayText: "Partial" };
  }
  if (status === "Not Recognized") {
    return { level: "Low", displayText: "Not Recognized" };
  }
  if (status === "Available") {
    return { level: "High", displayText: "Available" };
  }
  if (status === "Limited") {
    return { level: "Moderate", displayText: "Limited" };
  }
  if (status === "Not Available") {
    return { level: "Low", displayText: "Not Available" };
  }
  if (status === "Active - and enforced") {
    return { level: "Very High", displayText: "Active & Enforced" };
  }
  if (status === "Developed - not enforced") {
    return { level: "Moderate", displayText: "Developed (Unenforced)" };
  }
  if (status === "Under review") {
    return { level: "Moderate", displayText: "Under Review" };
  }
  if (status === "No PSR developed") {
    return { level: "Low", displayText: "No PSR Developed" };
  }
  return { level: "Moderate", displayText: status };
}

export function getSeverityBandClass(level: SeverityLevel) {
  if (level === "Low") {
    return "bg-green-500";
  }
  if (level === "Moderate") {
    return "bg-yellow-500";
  }
  if (level === "High") {
    return "bg-orange-500";
  }
  if (level === "Very High") {
    return "bg-red-500";
  }
  return "bg-slate-400";
}
