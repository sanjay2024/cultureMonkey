import React, { JSX } from "react";
import { classNames } from "../../utils";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const Button = ({
  onClick,
  isDisabled,
  children,
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={classNames({
        [styles.buttonContainer]: true,
        [styles["button-disable"]]: isDisabled ?? false,
      })}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
