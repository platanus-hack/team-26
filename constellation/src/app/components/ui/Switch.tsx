import React, { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  onIcon?: React.ReactNode; // Icon for the "On" state
  offIcon?: React.ReactNode; // Icon for the "Off" state
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  onIcon,
  offIcon,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) onChange(newState);
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative flex items-center cursor-pointer w-16 h-8 rounded-full p-1 
        transition-colors duration-200 ease-in-out
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : isChecked
            ? "bg-blue-500"
            : "bg-gray-500"
        }
        ${className}`}
    >
      {/* The Switch Knob */}
      <div
        className={`absolute left-1 flex items-center justify-center w-7 h-7 rounded-full bg-white transition-transform duration-200 ease-in-out
          ${isChecked ? "translate-x-8" : ""}`}
      >
        {isChecked ? onIcon : offIcon}
      </div>
    </div>
  );
};

export default Switch;
