import React from "react";
import { Theme, useThemeContext } from "../../theme";
import styles from "./style.module.scss";

const themeDisplay: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
};

export const LocalStorageExample = () => {
  const appTheme = useThemeContext();
  return (
    <div className={styles["container"]}>
      <button className={styles["theme-switcher"]} onClick={appTheme.toggle}>
        Make{" "}
        {appTheme.current === "light" ? themeDisplay.dark : themeDisplay.light}
      </button>
      <p className={styles["text"]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi
        repellat pariatur totam sint et consectetur molestiae in expedita. Dicta
        sint accusantium cupiditate repellendus voluptatibus eos a impedit
        veritatis deserunt.
      </p>
    </div>
  );
};
