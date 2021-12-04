import type { ReactNode } from "react";

export type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

const Button = ({ children, onClick }: ButtonProps): JSX.Element => (
  <button
    className="px-4 py-1 rounded-full text-white bg-blue-400"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
