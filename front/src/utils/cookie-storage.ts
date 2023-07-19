type Options = {
  expires?: Date | string;
  path?: string;
  "max-age"?: number;
};

export class CookieStorage {
  public static getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public static deleteCookie(name: string) {
    CookieStorage.setCookie(name, "", {
      "max-age": -1,
    });
  }

  public static setCookie(
    name: string,
    value: string,
    options: Partial<Options> = {}
  ) {
    options = {
      path: "/",
      // при необходимости добавьте другие значения по умолчанию
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      // @ts-ignore
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }
}
