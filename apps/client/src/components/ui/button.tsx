import type {
  ButtonHTMLAttributes,
} from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({
  children,
  className = "",
  ...props
}: Props) => {
  return (
    <button
      className={`
        h-10
        w-full
        border
        border-[#e5e7eb]
        bg-white
        px-4
        text-sm
        font-medium
        text-[#09090b]
        transition-all
        hover:border-[#b8bec8]
        hover:bg-[#f3f4f6]
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;