import React from "react";

interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-0.5 py-0.5 rounded-full font-semibold transition duration-200 ease-in-out
        text-white 
                ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"}
                focus:outline-none hover:opacity-75 active:scale-95 ${className}`}
    >
      <span
        className={`flex items-center justify-center w-full h-full bg-gray-900 rounded-full px-4 py-2 ${
          !label ? "justify-center" : ""
        }`}
      >
        {icon && <span className={`${label ? "mr-2" : ""}`}>{icon}</span>}
        {label}
      </span>
    </button>
  );
};

export default Button;
