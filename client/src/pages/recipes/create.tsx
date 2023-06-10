import React, { useState } from "react";
import TokenStorage from "../../storage/tokenStorage";
import { useNavigate } from "react-router-dom";

function CreateRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenStorage.readToken()}`,
      },
      body: JSON.stringify({
        title,
        ingredients,
        instructions,
        estimatedTime,
        image,
      }),
    });

    if (response.ok) {
      navigate("/");
    } else {
      alert("Failed to create recipe");
    }
  };

  return (
    <div className="mx-auto w-1/2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xl mb-2">Tytuł przepisu</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
          />
          <div className="flex justify-between items-center">
            <label className="text-xl mb-2">Składniki</label>
            <button
              type="button"
              onClick={() => setIngredients([...ingredients, ""])}
              className="border-yellow-500 h-10  rounded-lg border bg-transparent text-xl outline-none  hover:border-black focus:border-black mb-4 whitespace-nowrap px-6"
            >
              Dodaj składnik
            </button>
          </div>

          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
              placeholder={`Składnik ${index + 1}`}
              className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
            />
          ))}
          <label className="text-xl mb-2">
            Czas przygotowywania przepisu (min)
          </label>
          <input
            type="number"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(Number(e.target.value))}
            className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
          />
          <label className="text-xl mb-2">
            Instrukcje przygotowywania przepisu
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border-gray-300 h-32 w-full rounded-lg border bg-transparent px-3 text-xl outline-none hover:border-black focus:border-black mb-4 "
          />
          <label className="text-xl mb-2">Zdjęcie przepisu (url)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-gray-300 h-10 w-full rounded-lg border bg-transparent px-3 text-xl outline-none  hover:border-black focus:border-black mb-4"
          />
          <button
            type="submit"
            className="bg-neutral  text-neutral-content focus:bg-neutral-focus delay-50 border-yellow-500 focus:border-neutral-focus focus:text-neutral-focus relative h-12 w-full rounded-lg  border bg-inherit px-6 text-center align-middle text-xl text-[#181A2A] transition duration-300  hover:opacity-80 focus:bg-transparent focus:opacity-100"
          >
            Stwórz przepis
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRecipePage;
