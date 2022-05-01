import classNames from "classnames";
import React from "react";

export type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, React.ComponentPropsWithRef<"button">>(
  ({ children, disabled, className = "", ...props }: React.ComponentPropsWithRef<"button">, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={classNames(
          "inline-flex items-center  border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-blue-500  px-4 py-2 text-sm",
          { "bg-gray-400": disabled, "hover:bg-blue-600 focus:ring-blue-400": !disabled },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
