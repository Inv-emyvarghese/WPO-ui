import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
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
import axios from "axios";
import { useTranslation } from "react-i18next";

type LoginFormInput = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { t } = useTranslation();

  const { setToken, setUser } = useMyContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
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
      if (axios.isAxiosError(err)) {
        if (err?.response?.status == 401 || err?.response?.status == 400) {
          setError("root", {
            type: "server",
            message: "errors.login.credentialsInvalid",
          });
        } else {
          setError("root", {
            type: "server",
            message: "errors.app.unexpected",
          });
        }
      } else {
        setError("root", {
          type: "unknown",
          message: "errors.app.unexpected",
        });
      }
    }
  };

  const inputBase =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 disabled:bg-slate-100";
  const inputError = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-[460px] overflow-hidden rounded-lg border border-slate-200 bg-white text-center shadow-md">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-xl font-medium text-slate-900">
            {t("auth.login.title")}
          </h2>
        </div>
        <div className="px-6 py-4">
          <p className="mb-6 text-left text-sm text-slate-600">
            {t("auth.login.text")}
          </p>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(handleLogin)}
            noValidate
          >
            <div className="text-left">
              <label
                htmlFor="login-email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                {t("auth.login.labels.email")}
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="off"
                placeholder="name@example.com"
                maxLength={255}
                disabled={isSubmitting}
                className={`${inputBase} ${errors.email || errors.root ? inputError : ""}`}
                {...register("email", {
                  ...emailValidation,
                  onChange: () => clearErrors("root"),
                })}
              />
              {errors.email?.message && (
                <p className="mt-1 text-left text-sm text-red-600">
                  {t(errors.email.message)}
                </p>
              )}
            </div>

            <div className="text-left">
              <label
                htmlFor="login-password"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                {t("auth.login.labels.password")}
              </label>
              <input
                id="login-password"
                type="password"
                maxLength={100}
                disabled={isSubmitting}
                className={`${inputBase} ${errors.password || errors.root ? inputError : ""}`}
                {...register("password", {
                  required: passwordValidation.required,
                  onChange: () => clearErrors("root"),
                })}
              />
              {errors.password?.message && (
                <p className="mt-1 text-left text-sm text-red-600">
                  {t(errors.password.message)}
                </p>
              )}
            </div>

            {errors.root?.message && (
              <p className="text-left text-sm text-red-600">
                {t(errors.root.message)}
              </p>
            )}

            

            <button
              type="submit"
              disabled={isSubmitting}
              className="no-transform-button-text flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? <LoadingSpinner /> : t("buttons.login")}
            </button>
          </form>

         
         
          
        </div>
      </div>
    </div>
  );
}
