import React, { useEffect } from "react";
import tokenStorage from "./storage/tokenStorage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AuthenticatedTemplate from "./templates/AuthenticatedTemplate";
import NonAuthenticatedTempalte from "./templates/NonAuthenticatedTemplate";

const checkCachedUser = async () => {
  const savedToken = tokenStorage.readToken();

  if (!savedToken) {
    tokenStorage.removeToken();
    return false;
  }

  return true;
};

export const loginCachedUser = () => {
  return useQuery(["loginCachedUser"], checkCachedUser, {
    retry: false,
  });
};

const isAuthnticated = () => {
  return useQuery(["isAuthenticated"], checkCachedUser, {
    retry: false,
    staleTime: Infinity,
  });
};

function App() {
  const { data: isAuthenticated, isLoading } = isAuthnticated();
  const { refetch } = loginCachedUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading && <div>Loading...</div>}

      {!isAuthenticated && !isLoading && <NonAuthenticatedTempalte />}

      {isAuthenticated && !isLoading && <AuthenticatedTemplate />}
    </>
  );
}

export default App;
