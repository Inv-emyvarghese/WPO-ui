// ContactContext.tsx
import { refreshToken } from "@/services/token-service/tokenService";
import {
  getAccessTokenExpiry,
  getRefreshToken,
  removeRefrehsToken,
  setAccessToken,
  setAccessTokenExpiry,
  setRefreshToken,
} from "@/utils/tokenUtils";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";

export type User = {
  name?: string;
  email: string | undefined;
  signup_type?: number;
  image_url?: string | null;
  last_login?: string;
  password_at?: string;
};

interface ContactContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  handleLogout: () => void;
  loading: boolean | null;
  setLoading: (loading: boolean | null) => void;
  user: User | null;
  setUser: (user: User | ((prev: User | null) => User | null)) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  //handling token
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("accessToken")
  );

  //handling global loading state
  const [loading, setLoading] = useState<boolean | null>(true);

  //handle user logout
  const handleLogout = () => {
    removeRefrehsToken();
    sessionStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    setToken(null);
    setUser(null);
  };

  //handle user-data
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  

  //persist the data on localstotage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

 

  //refreshToken API call functionality implementation
  useEffect(() => {
    if (!getRefreshToken()) {
      void Promise.resolve().then(() => {
        setLoading(false);
      });
      return;
    }

    const refreshAndSetToken = async () => {
      try {
        const res = await refreshToken();
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
      } catch (error) {
        console.error("Token refresh failed", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    //set the timeout for calling the refreshTokrn API automatically before the accessToken expiry
    const accessTokenExpiry = getAccessTokenExpiry();

    if (!accessTokenExpiry) {
      refreshAndSetToken();
      return;
    }

    const tokenExpiryDate = new Date(accessTokenExpiry).getTime(); // expiry time in ms
    const currentTime = Date.now(); // current time in ms
    const refreshBufferTime = 30000;
    const apiCallIntervalMs = tokenExpiryDate - currentTime - refreshBufferTime; // 30 seconds before token expiry

    if (apiCallIntervalMs <= 0) {
      refreshAndSetToken();
      return;
    }

    void Promise.resolve().then(() => {
      setLoading(false);
    });
    const timeoutId = setTimeout(() => {
      //call refreshToken API
      refreshAndSetToken();
    }, apiCallIntervalMs);

    return () => clearTimeout(timeoutId);
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      handleLogout,
      loading,
      setLoading,
      user,
      setUser,
    }),
    [token, loading, user]
  );
  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useMyContext must be used within a ContactProvider");
  }
  return context;
};
