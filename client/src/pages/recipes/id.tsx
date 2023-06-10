import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useMe } from "../../templates/AuthenticatedTemplate";
import TokenStorage from "../../storage/tokenStorage";

function RecipeActions({ recipe, onDelete }: any) {
  return (
    <div className="flex flex-row gap-4 py-2">
      <Link
        to={`/recipes/${recipe._id}/edit`}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Edytuj
      </Link>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={onDelete}
      >
        Usuń
      </button>
    </div>
  );
}

function RecipeDetails({ recipe }: any) {
  return (
    <article>
      <img src={recipe.image} className="w-full h-32 sm:h-48 object-cover" />
      <div className="m-4">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">{recipe.title}</h2>
          <span className="flex items-center gap-2">
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
        <h3 className="font-bold mt-4">Składniki</h3>
        {recipe.ingredients.map((ingredient: any) => (
          <div className="flex justify-between">
            <span>{ingredient}</span>
          </div>
        ))}
        <h3 className="font-bold mt-4">Instrukcja przygotowania</h3>
        <p className="block text-gray-500 text-sm">{recipe.instructions}</p>
      </div>
    </article>
  );
}

const useRecipe = (_id: string) => {
  const fetchRecipe = async () => {
    const response = await fetch(`/api/recipes/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  return useQuery(["recipe", _id], fetchRecipe);
};

const useDeleteRecipe = (_id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteRecipe = () => {
    fetch(`/api/recipes/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenStorage.readToken()}`,
      },
    }).then(() => {
      queryClient.invalidateQueries(["recipes"]);
      navigate("/");
    });
  };

  return deleteRecipe;
};

function RecipePage() {
  const location = useLocation();
  const _id = location.pathname.split("/")[2];

  const {
    data: recipe,
    isSuccess: isRecipeSuccess,
    isLoading: isRecipeLoading,
  } = useRecipe(_id);
  const deleteRecipe = useDeleteRecipe(recipe?._id);

  const {
    data: user,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
  } = useMe();

  return (
    <>
      {(isRecipeLoading || isUserLoading) && (
        <div className="h-full flex flex-col items-center justify-center">
          <ClipLoader />
        </div>
      )}
      {!(isRecipeLoading || isUserLoading) && (
        <div className="flex flex-col w-1/2 mx-auto">
          {isRecipeSuccess &&
            isUserSuccess &&
            (user._id === recipe.author._id || user.role === "admin") && (
              <RecipeActions recipe={recipe} onDelete={deleteRecipe} />
            )}
          {isRecipeSuccess && <RecipeDetails recipe={recipe} />}
        </div>
      )}
    </>
  );
}

export default RecipePage;
