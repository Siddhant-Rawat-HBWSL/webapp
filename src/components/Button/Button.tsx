"use client";

import React from "react";

type Props = {
  text: string;
  variant: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  disabled?: boolean;
  styles?: string;
};

function Button({ text, variant, onClick, disabled, styles }: Props) {
  const baseStyles = "px-4 py-3 text-center";

  const disabledStyles = "opacity-50 pointer-events-none";

  const variantStyles =
    variant === "primary"
      ? "text-tertiary-white bg-tertiary-yellow-0 hover:bg-tertiary-yellow-1 active:bg-tertiary-yellow-2"
      : variant === "secondary"
      ? "text-secondary-1 border-secondary-0 border border-solid hover:bg-primary-0 active:bg-primary-3"
      : "";

  return (
    <>
      <button
        type="button"
        className={`${baseStyles} ${variantStyles} ${styles} ${
          disabled ? disabledStyles : ""
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default Button;
