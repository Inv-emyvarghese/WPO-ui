// Function to extract the name part from a given email address
export const extractNameFromEmail = (email: string): string => {
  return email.split("@")[0];
};

// Function to set the currentUser in localStorage
export const convertToJapaneseDate = (dateString: string): string => {
  console.log(dateString, "dateString");

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS months are 0-based
  const day = date.getDate();

  return `${year}年${month.toString().padStart(2, "0")}月${day
    .toString()
    .padStart(2, "0")}日 `;
};


// Function to set the userRole in localStorage
export const setUserRole = (userRole: string) => {
  return localStorage.setItem("userRole", userRole);
};

// Function to get the userRole from localStorage
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// Function to remove the userRole from localStorage
export const removeUserRole = () => {
  localStorage.removeItem("userRole");
};
//Function ton trim value
export function trimValue(value: string): string {
  return value.trim();
}

//Function ton trim Object value
export function trimObjectValues<T extends Record<string, any>>(obj: T): T {
  const trimmed: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];
    trimmed[key] = typeof value === "string" ? value.trim() : value;
  }

  return trimmed as T;
}
export const formatUTCToLocalDate = (date?: string, locale: string = "en") => {
  if (!date) return "--";

  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  if (locale === "en") {
    // Format: YYYY-MM-DD HH:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  if (locale === "jp") {
    // Format: YYYY年MM月DD日 HH時MM分SS秒
    return `${year}年${month}月${day}日 ${hours}時${minutes}分${seconds}秒`;
  }

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};