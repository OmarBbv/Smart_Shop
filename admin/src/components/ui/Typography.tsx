import React, { forwardRef } from "react";

type SxProps = React.CSSProperties;

interface BoxProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  sx?: SxProps;
  component?: React.ElementType;
  children?: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, BoxProps>(
  ({ sx, component: Component = "p", children, ...rest }, ref) => {
    return (
      <Component style={sx} ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = "typography";
