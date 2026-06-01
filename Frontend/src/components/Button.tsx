interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inter tracking-widest w-full bg-primary-900 text-secondary-100 py-4 mt-2 font-medium hover:bg-primary-700 transition-colors uppercase ${className}`}
    >
      {children}
    </button>
  );
}