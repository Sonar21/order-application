"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/data/userAuth";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username);
    router.push("/");
  };

  return (
    <main style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">ログイン</button>
      </form>
    </main>
  );
}
