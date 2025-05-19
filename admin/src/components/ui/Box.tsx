import React, { forwardRef } from "react";

type SxProps = React.CSSProperties;

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  sx?: SxProps;
  component?: React.ElementType;
  children?: React.ReactNode;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ sx, component: Component = "div", children, ...rest }, ref) => {
    const style: React.CSSProperties = {
      ...sx,
      ...(Component === "button" ? { cursor: "pointer" } : {}),
    };

    return (
      <Component style={style} ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Box.displayName = "Box";
