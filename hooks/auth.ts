"use client";

import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { delay } from "@/lib/utils";

export const useAuth = ({ middleware, redirectIfAuthenticated }: any = {}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, setStatus, ...props }: any) => {
    setIsLoading(true);
    await delay(1000);
    await csrf();

    setErrors([]);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
    setIsLoading(false);
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }: any) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.replace(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.replace(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error, redirectIfAuthenticated]);

  return {
    user,
    isLoading,
    login,
    forgotPassword,
    resendEmailVerification,
    logout,
  };
};
