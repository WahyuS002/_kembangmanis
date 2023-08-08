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
        className={cn("text-4xl font-extrabold lg:text-6xl", className)}
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

const TypographyH3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2 className={cn("text-xl font-bold", className)} ref={ref} {...props}>
        <Balancer>{children}</Balancer>
      </h2>
    );
  }
);

TypographyH3.displayName = "TypographyH3";

export { TypographyH1, TypographyH2, TypographyH3 };
