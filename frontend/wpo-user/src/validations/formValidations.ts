// First name validation rules
export const firstNameValidation = {
  required: "errors.firstName.required",
  pattern: {
    value: /^(?!.*[ \u3000])[\p{L}\p{N}\p{P}\p{S}]+$/u,
    message: "errors.firstName.invalid",
  },
};
// Web URL validation rules
export const webUrlValidation = {
  validate: (value?: string) => {
    if (!value) return true; // allow empty

    const originalValue = value.trim();

    try {
      const parsedUrl = new URL(originalValue);

      // Only allow http and https
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return "errors.webUrl.invalid";
      }

      const hostname = parsedUrl.hostname;
      const isIPv4 =
        /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) &&
        hostname.split(".").every((octet) => {
          const n = Number(octet);
          return n >= 0 && n <= 255;
        });
      const isIPv6 =
        /^[0-9a-fA-F:]+$/.test(hostname) && hostname.includes(":");

      if (!isIPv4 && !isIPv6) {
        // Check TLD is not only digits
        const hostParts = hostname.split(".");
        const tld = hostParts[hostParts.length - 1];
        if (/^\d+$/.test(tld)) {
          return "errors.webUrl.invalid";
        }
      }

      // Block dangerous characters
      if (/[<>]/.test(originalValue)) {
        return "errors.webUrl.invalid";
      }

      // Max length restriction
      if (originalValue.length > 1000) {
        return "errors.webUrl.invalid";
      }

      return true; // ✅ valid
    } catch {
      return "errors.webUrl.invalid";
    }
  },
};

export const stateValidation = {
  pattern: {
    value: /^(?!.*[-.',’/&\s]{2,})(?![-.',’/&\s])[\p{L}\p{N}\s\-.'’,/&]+(?<![-.',’/&\s])$/u,
    message: 'errors.city.invalid',
  },
}
export const cityValidation = {
  pattern: {
    value: /^(?!.*[-.',’/&\s]{2,})(?![-.',’/&\s])[\p{L}\p{N}\s\-.'’,/&]+(?<![-.',’/&\s])$/u,
    message: 'errors.state.invalid',
  },
}

export const addressValidation = {
  pattern: {
    value: /^[\p{L}\p{N}\s\-.,'’#/()&]+$/u,
    message: 'errors.address.invalid',
  },
}
// ZIP code validation rules
export const zipCodeValidation = {
  pattern: {
    value: /^(?!0+$)[\d-]{5,15}$/,
    message: "errors.zipcode.invalid",
  },
};

// Email validation rules
export const emailValidation = {
  required: "errors.email.required",
  pattern: {
    value:
      /^(?!.*\.\.)[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]{0,63}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/,
    message: "errors.email.invalid",
  },
};

// Phone number validation rules
export const phoneValidation = {
  required: "errors.phone.required",
  pattern: {
    value: /^\+?[0-9-]{9,15}$/,
    message: "errors.phone.invalid",
  },
};

// Password validation rules with added regex pattern for strong passwords
export const passwordValidation = {
  required: "errors.password.required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,100}$/,
    message: "errors.password.invalid",
  },
};

// Confirm password validation rules
export const confirmPasswordValidation = (getPassword: () => string) => ({
  required: "errors.confirmPassword.required",
  validate: (value: string) =>
    value === getPassword() || "errors.confirmPassword.mismatch",
});

// File validation rules
export const fileValidation = {
  required: "errors.file.required",
  validate: {
    lessThan2MB: (files: FileList) =>
      (files && files[0]?.size < 2 * 1024 * 1024) || "errors.file.size",
  },
};

// Hiragana or Katakana Name Validation (with space allowed)
export const KanaNameValidation = {
  withSpace: {
    pattern: {
      value:
        /^[\p{Script=Hiragana}\p{Script=Katakana}\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEFー]+$/u,
      message: "errors.katakanaOrhiragana.invalid",
    },
  },
  withoutSpace: {
    pattern: {
      value: /^[\p{Script=Hiragana}\p{Script=Katakana}ー]+$/u,
      message: "errors.katakanaOrhiragana.invalid",
    },
  },
};

// Kanji Name Validation (with space allowed)
export const kanjiNameValidation = {
  withSpace: {
    pattern: {
      value: /^[\p{Script=Han}ー\u3000-\u303F]+$/u,
      message: "errors.kanji.invalid",
    },
  },
  withoutSpace: {
    pattern: {
      value: /^[\p{Script=Han}ー]+$/u,
      message: "errors.kanji.invalid",
    },
  },
};

// English name validation rules
export const nameValidation = {
  required: "errors.name.required",
  pattern: {
    value: /^(?!\s*$)(?!\s).*?(?<!\s)$/u,
    message: "errors.name.invalid",
  },
};


// locality or state validation rules
export const localityOrStateValidation = {
  pattern: {
    value: /^(?! )[A-Za-z'-]+(?: [A-Za-z'-]+)*(?<! )$/,
    message: "errors.name.invalid",
  },
};
