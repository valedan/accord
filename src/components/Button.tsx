import classNames from "classnames";
import React from "react";

export type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, React.ComponentPropsWithRef<"button">>(
  ({ children, className = "", ...props }: React.ComponentPropsWithRef<"button">, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          "inline-flex items-center  border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 px-4 py-2 text-sm",
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
