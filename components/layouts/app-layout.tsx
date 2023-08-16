"use client";

import { useAuth } from "@/hooks/auth";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth({ middleware: "auth" });

  return <>{children}</>;
};

export default AppLayout;
