import React from "react";

const Input = ({ type = "text", id, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="capitalize text-gray-400">
        {id}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="w-full rounded-md bg-gray-900 border-2 border-transparent outline-transparent px-2 h-10 focus:border-blue-400 focus:outline-transparent focus:ring-0"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
