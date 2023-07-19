import { CookieStorage } from "@/utils/cookie-storage";
import { useEffect, useState } from "react";

export const CookieStorageExample = () => {
  const [authCookie, setAuthCookie] = useState<string | undefined>(undefined);
  const [secretCookie, setSecretCookie] = useState<string | undefined>(undefined);
  const login = async () => {
    const response = await fetch("http://localhost:8000", {
      mode: "cors",
      credentials: "include",
    });
    response.json().then(() => {
      setAuthCookie(CookieStorage.getCookie("authcookie"));
      setSecretCookie(CookieStorage.getCookie("secret"));
    });
  };
  useEffect(() => {
    setAuthCookie(CookieStorage.getCookie("authcookie"));
    setSecretCookie(CookieStorage.getCookie("secret"));
  }, [])

  const setAuth = () => {
    CookieStorage.setCookie('authcookie', 'fromjs')
    setAuthCookie(CookieStorage.getCookie("authcookie"));
  }

  const setSecret = () => {
    CookieStorage.setCookie('secret', 'valuefromjs')
    setSecretCookie(CookieStorage.getCookie("secret"));
  }
  return (
    <div>
      <p>authcookie: {authCookie}</p>
      <p>secret: {secretCookie}</p>
      <button onClick={login} type="button">
        Login
      </button>
      <button onClick={setAuth} type="button">
        Try to set <pre>authcookie</pre> value
      </button>
      <button onClick={setSecret} type="button">
        Try to set <pre>secret</pre> value
      </button>
    </div>
  );
};
