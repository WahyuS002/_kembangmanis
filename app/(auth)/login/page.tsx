"use client";

import axios from "@/lib/axios";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRemember, setShouldRemember] = useState(false);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState(null);

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleLogin = async () => {
    await csrf();

    setErrors([]);
    setStatus(null);

    await axios
      .post("/login", {
        email: email,
        password: password,
      })
      // .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });

    const { data } = await axios.get("/api/user");
    setUser(data);
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          className="border border-black"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="border border-black"
        />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
      {user && <div>{JSON.stringify(user)}</div>}
    </div>
  );
}
