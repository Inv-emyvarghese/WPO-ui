import { useMyContext } from "@/context/ContactContext";
import { googleSSO } from "@/services/auth-service/authService";
import { showConfirmDialog } from "@/utils/toastUtils";
import {
  setAccessToken,
  setAccessTokenExpiry,
  setRefreshToken,
} from "@/utils/tokenUtils";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Defining the GoogleSSO props type
type GoogleSSOProps = {
  sourcePage: string;
};

export default function GoogleSSO({ sourcePage }: GoogleSSOProps) {
  const { t } = useTranslation(); //defining the localization variable

  const navigate = useNavigate(); // Used for navigation after successful login

  const { setToken, setUser } = useMyContext(); // Context to manage the global token,user state

  //handle SSO-login API
  const handleAPICall = async (payload: object, isForce: boolean) => {
    const res = await googleSSO(payload, sourcePage, isForce);
    if (!res || !res.access_token || !res.refresh_token) {
      return;
    }
    const { access_token, refresh_token, user } = res;

    setAccessToken(access_token.token);
    setAccessTokenExpiry(access_token.expiry);
    setRefreshToken(refresh_token.token);
    setToken(access_token.token);

    //Saving user information in context
    if (user) {
      const { name, email, signup_type, image_url } = user;
      setUser({ name, email, signup_type, image_url });
    }

    navigate("/"); // Redirect to contacts page
  };

  // Helper to show a confirm dialog and return result
  const showDialog = async (
    type: "accountNotFound" | "userExist" | "linkAccount"
  ) => {
    const dialogMap = {
      accountNotFound: {
        title: t("modals.sso.accountNotFound.title"),
        text: t("modals.sso.accountNotFound.text"),
        confirmButtonText: t("modals.sso.accountNotFound.confirmButtonText"),
        cancelButtonText: t("modals.sso.accountNotFound.cancelButtonText"),
      },
      userExist: {
        title: t("modals.sso.userExist.title"),
        text: t("modals.sso.userExist.text"),
        confirmButtonText: t("modals.sso.userExist.confirmButtonText"),
        cancelButtonText: t("modals.sso.userExist.cancelButtonText"),
      },
      linkAccount: {
        title: t("modals.sso.linkAccount.title"),
        text: t("modals.sso.linkAccount.text"),
        confirmButtonText: t("modals.sso.linkAccount.confirmButtonText"),
        cancelButtonText: t("modals.sso.linkAccount.cancelButtonText"),
      },
    };
    return showConfirmDialog({
      ...dialogMap[type],
      icon: "warning",
    });
  };

  //handle SSO login
  const handleSSOLogin = async (credentialResponse: CredentialResponse) => {
    const payload = { token: credentialResponse.credential };
    try {
      await handleAPICall(payload, false);
    } catch (err: unknown) {
      await handleError(err, payload);
    }
  };

  const handleError = async (err: any, payload: any) => {
    if (!axios.isAxiosError(err)) {
      console.error(err);
      return;
    }
    const statusCode = err.status;
    if (statusCode === 404) {
      const result = await showDialog("accountNotFound");
      if (result.isConfirmed) await handleAPICall(payload, true);
      return;
    }
    if (statusCode === 409) {
      const apiErrors = err?.response?.data?.error;
      if (apiErrors === "User already exists") {
        const result = await showDialog("userExist");
        if (result.isConfirmed) navigate("/login");
      } else {
        const result = await showDialog("linkAccount");
        if (result.isConfirmed) await handleAPICall(payload, true);
      }
    }
  };

  return (
    <GoogleLogin
      text={sourcePage == "login" ? "signin_with" : "signup_with"}
      logo_alignment="center"
      auto_select={false}
      useOneTap={false}
      onSuccess={handleSSOLogin}
      onError={() => {
        console.error("google Login Failed");
      }}
    />
  );
}
