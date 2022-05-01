import React from "react";

export type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, React.ComponentPropsWithRef<"button">>(
  ({ children, className = "", ...props }: React.ComponentPropsWithRef<"button">, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
