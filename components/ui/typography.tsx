import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";
import Balancer from "react-wrap-balancer";

export interface TypographyProps {
  children: ReactNode;
  className?: string;
}

const TypographyH1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1
        className={cn("text-6xl font-extrabold", className)}
        ref={ref}
        {...props}
      >
        <Balancer>{children}</Balancer>
      </h1>
    );
  }
);

TypographyH1.displayName = "TypographyH1";

const TypographyH2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2 className={cn("text-3xl font-bold", className)} ref={ref} {...props}>
        <Balancer>{children}</Balancer>
      </h2>
    );
  }
);

TypographyH2.displayName = "TypographyH2";

export { TypographyH1, TypographyH2 };
