"use client";

import { useAuth } from "@/hooks/auth";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth({ middleware: "guest" });

  return <>{children}</>;
};

export default GuestLayout;
