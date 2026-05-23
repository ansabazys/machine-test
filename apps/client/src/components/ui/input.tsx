import type {
  InputHTMLAttributes,
} from "react";

const Input = ({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`
        h-10
        w-full
        border
        border-[#e5e7eb]
        bg-white
        px-3
        text-sm
        text-[#09090b]
        outline-none
        transition-all
        placeholder:text-[#9ca3af]
        focus:border-[#b8bec8]
        focus:ring-1
        focus:ring-[#d1d5db]
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;