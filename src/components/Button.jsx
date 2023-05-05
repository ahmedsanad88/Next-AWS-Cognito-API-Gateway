import React from "react";

const Button = ({
  text,
  onClick,
  bgColor = "bg-yellow-600",
  color = "text-white",
  type = "submit",
  isDisabled = false,
}) => {
  return (
    <button
      className={`w-full h-10 px-4 rounded-lg ${bgColor} ${color} font-bold active:scale-[0.98] mt-4 uppercase disabled:opacity-50 disabled:cursor-not-allowed`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
