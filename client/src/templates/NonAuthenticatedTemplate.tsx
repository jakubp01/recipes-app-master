import React, { FC } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home/home";
import SingupPage from "../pages/auth/signup";
import LoginPage from "../pages/auth/login";
import RecipePage from "../pages/recipes/id";

const NonAuthenticatedTempalte: FC = () => {
  return (
    <>
      <header className="fixed left-0 top-0 z-10 w-full border-b border-base-border bg-white">
        <div className=" mx-4 flex h-[4rem]">
          <Link
            to="/im/home"
            className="flex items-center whitespace-nowrap font-bold"
          >
            Przepisy.pl
          </Link>
          <nav className="flex w-full items-center justify-end">
            <ul className="flex gap-5">
              <li>
                <Link to="/auth/login">Logowanie</Link>
              </li>
              <li>
                <Link to="/auth/signup">Rejestracja</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="pt-[7rem]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/auth/signup" element={<SingupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

export default NonAuthenticatedTempalte;
