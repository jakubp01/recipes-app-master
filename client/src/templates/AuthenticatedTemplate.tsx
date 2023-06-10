import React, { FC, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TokenStorage from "../storage/tokenStorage";
import CreateRecipePage from "../pages/recipes/create";
import EditRecipePage from "../pages/recipes/edit";
import RecipePage from "../pages/recipes/id";

const fetchUser = async () => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TokenStorage.readToken()}`,
    },
  });

  return response.json();
};

export const useMe = () => {
  return useQuery(["me"], fetchUser);
};

const AuthenticatedTemplate: FC = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.setQueryData(["isAuthenticated"], false);
    TokenStorage.removeToken();
  };

  return (
    <>
      <div className="">
        <header className="fixed left-0 top-0 z-10 w-full border-b border-base-border bg-white">
          <div className=" mx-4 flex h-[4rem]">
            <Link
              to="/"
              className="flex items-center whitespace-nowrap font-bold"
            >
              Przepisy.pl
            </Link>
            <div className="flex items-center gap-4 whitespace-nowrap ml-6">
              <Link to="/recipes/create">Stwórz przepis</Link>
            </div>
            <nav className="flex w-full items-center justify-end gap-10">
              <Link to="/auth/login" onClick={logout}>
                Wyloguj się
              </Link>
            </nav>
          </div>
        </header>
        <main className="pt-[4.5rem]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes/create" element={<CreateRecipePage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default AuthenticatedTemplate;
