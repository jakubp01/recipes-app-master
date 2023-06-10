import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const fetchRecipes = async () => {
  const response = await fetch("/api/recipes");
  return response.json();
};

const recipes = () => {
  return useQuery(["recipes"], fetchRecipes);
};

export const HomePage = () => {
  const { data: recipesData, isLoading } = recipes();
  return (
    <>
      <div className="h-[calc(100vh_-_4rem)]">
        {isLoading && (
          <div className="h-full flex flex-col items-center justify-center">
            <ClipLoader />
          </div>
        )}
        <div className="mt-4 grid lg:grid-cols-3 gap-10">
          {recipesData &&
            recipesData.map((recipe: any) => (
              <Link
                key={recipe._id}
                className="card shadow-md hover:shadow-lg"
                to={`/recipes/${recipe._id}`}
              >
                <article className="flex flex-col">
                  <img
                    src={recipe.image}
                    className="w-full h-32 sm:h-48 object-cover"
                  />
                  <div className="m-4">
                    <div className="flex justify-between">
                      <h2 className="font-bold">{recipe.title}</h2>
                      <span className="flex gap-2">
                        <svg
                          className="w-5 inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{recipe.estimatedTime} minut</span>
                      </span>
                    </div>
                    <p className="block text-gray-500 text-sm">
                      {recipe.instructions}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
