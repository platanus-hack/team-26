// app/component/Input.tsx
import React from "react";

interface InputProps {
  value: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  id,
  onChange,
  placeholder = "",
  disabled = false,
  type = "text",
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`px-4 py-2 rounded-lg w-full bg-gray-800 text-white placeholder-gray-500
        transition duration-200 ease-in-out 
        ${disabled ? "bg-gray-500 cursor-not-allowed" : "focus:bg-gray-700"}
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
    />
  );
};

export default Input;
