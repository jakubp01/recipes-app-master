import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import TokenStorage from "../../storage/tokenStorage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: any) => {
    queryClient.setQueryData(["loginPending"], true);
    e.preventDefault();

    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      queryClient.setQueryData(["isAuthenticated"], true);
      queryClient.setQueryData(["loginCachedUser"], true);
      const jsonResponse = await response.json();
      TokenStorage.saveToken(jsonResponse.token);
      queryClient.setQueryData(["loginPending"], false);
    } else {
      alert("Invalid credentials");
      queryClient.setQueryData(["loginPending"], false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 mx-auto">
      <h1 className="text-3xl mb-4">Logowanie</h1>
      <label className="text-xl mb-2">Email</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
      />
      <label className="text-xl mb-2">Hasło</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
      />
      <button
        type="submit"
        className="bg-neutral  text-neutral-content focus:bg-neutral-focus delay-50 border-yellow-500 focus:border-neutral-focus focus:text-neutral-focus relative h-12 w-full rounded-lg  border bg-inherit px-6 text-center align-middle text-xl text-[#181A2A] transition duration-300  hover:opacity-80 focus:bg-transparent focus:opacity-100"
      >
        Zaloguj się
      </button>
    </form>
  );
}

export default LoginPage;
