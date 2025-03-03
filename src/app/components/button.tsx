'use client';

import { IData } from "./table";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, row: { original: IData }) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
}
