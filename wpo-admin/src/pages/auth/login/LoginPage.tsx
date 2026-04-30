import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "@/services/auth-service/authService";
import { useMyContext } from "@/context/ContactContext";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import {
  emailValidation,
  passwordValidation,
} from "@/validations/formValidations";
import {
  setAccessToken,
  setAccessTokenExpiry,
  setRefreshToken,
} from "@/utils/tokenUtils";
import { useTranslation } from "react-i18next";
import type { ToastMessageType } from "@/constants/enum";
import { extractErrorMessage } from "@/utils/errorUtils";
import ToastMessage from "@/components/common/toast/ToastMessage";

type LoginFormInput = {
  email: string;
  password: string;
};

const LABEL_STYLE: CSSProperties = {
  fontFamily: "Inter",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "17px",
  color: "#000000",
};

function getInputStyle(hasError: boolean): CSSProperties {
  return {
    height: "40px",
    background: "#FFFFFF",
    border: `1px solid ${hasError ? "#DC2626" : "#A3A3A3"}`,
    borderRadius: "6px",
    fontFamily: "Inter",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "17px",
    color: "#49525D",
  };
}

export default function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessageType | undefined>(undefined);
  const { setToken, setUser } = useMyContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>();

  const handleLogin: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      const res = await login(data);
      const { access_token, refresh_token, user } = res;

      setAccessToken(access_token.token);
      setAccessTokenExpiry(access_token.expiry);
      setRefreshToken(refresh_token.token);
      setToken(access_token.token);

      if (user) {
        const { name, email, signup_type, image_url } = user;
        setUser({ name, email, signup_type, image_url });
      }

      reset();
      navigate("/");
    } catch (err: unknown) {
      setToastMessage({
        message: extractErrorMessage(
          err,
          t("auth.login.errors.credentialsInvalid") || "Invalid email or password"
        ),
        type: "error",
      });
    }
  };

  const emailHasError = Boolean(errors.email || errors.root);
  const passwordHasError = Boolean(errors.password || errors.root);

  return (
    <>
      {toastMessage?.message && (
        <ToastMessage
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(undefined)}
        />
      )}
      <div className="flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {t("auth.login.title")}
            </h1>
            <p className="text-gray-600">{t("auth.login.text")}</p>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-6 text-left"
            noValidate
          >
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block"
                style={LABEL_STYLE}
              >
                {t("auth.login.labels.username")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-email"
                  type="text"
                  autoComplete="username"
                  maxLength={255}
                  disabled={isSubmitting}
                  placeholder={t("auth.login.placeholders.username")}
                  className="w-full pr-4 pl-10 transition outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  style={getInputStyle(emailHasError)}
                  {...register("email", {
                    ...emailValidation,
                    onChange: () => {
                      clearErrors("root");
                    },
                  })}
                />
              </div>
              {errors.email?.message && (
                <p className="mt-1 text-left text-sm text-red-600">
                  {t(errors.email.message || "auth.login.errors.credentialsInvalid")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block"
                style={LABEL_STYLE}
              >
                {t("auth.login.labels.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  maxLength={100}
                  disabled={isSubmitting}
                  placeholder={t("auth.login.placeholders.password")}
                  className="w-full pr-12 pl-10 transition outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  style={getInputStyle(passwordHasError)}
                  {...register("password", {
                    required: passwordValidation.required,
                    onChange: () => {
                      clearErrors("root");
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showPassword
                      ? t("auth.login.a11y.hidePassword")
                      : t("auth.login.a11y.showPassword")
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="mt-1 text-left text-sm text-red-600">
                  {t(errors.password.message || "auth.login.errors.credentialsInvalid")}
                </p>
              )}
            </div>

            {errors.root?.message && (
              <p className="text-left text-sm text-red-600">
                {t(errors.root.message || "auth.login.errors.credentialsInvalid")}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#002D5B] font-medium text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ height: "40px" }}
            >
              {isSubmitting ? <LoadingSpinner /> : t("auth.login.buttons.login")}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
