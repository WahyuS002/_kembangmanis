"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import { delay } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { Toaster, toast } from "sonner";

interface Errors {
  email?: string[];
  password?: string[];
}

export default function LoginPage() {
  const { login, isLoading } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/admin/structures",
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<Errors>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.error("Email atau password salah");
  };

  return (
    <div className="relative">
      <Toaster />
      <div className="absolute left-4 top-10 md:left-20 md:top-12">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.arrowLeft className="w-5" />
          <span className="text-sm font-medium">Kembali</span>
        </Link>
      </div>
      <form
        onSubmit={submitForm}
        className="flex justify-center items-center h-screen"
      >
        <Card className="mx-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Masuk</CardTitle>
            <CardDescription>
              Masukkan email dan password untuk masuk ke akun anda
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.email && email === "" && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors?.password && password === "" && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? <Icons.loadingCircle /> : "Masuk"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
