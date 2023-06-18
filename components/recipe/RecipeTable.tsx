import { IngredientList, Ingredients } from "@/app/[lang]/rezepte/[slug]/Recipe";
import React from "react";


const RecipeTable = ({ recipe }: { recipe: Ingredients[] }) => (
  <>
    {recipe?.map((obj) => (
      <table className="mb-8 w-full" key={obj.title}>
        <thead>
          <tr>
            <th
              className="pb-4 text-left text-lg tracking-widest lg:text-xl"
              colSpan={2}
            >
              {obj.title.toUpperCase()}
            </th>
          </tr>
        </thead>
        <tbody>
          {obj.ingredientsList.map((ingredient: IngredientList) => {
            return (
              <tr className="text-lg" key={ingredient.title}>
                <td className="w-2/5 pl-4 lg:w-1/3 lg:pl-0">
                  {ingredient.quantity}
                </td>
                <td className="w-full font-bold">{ingredient.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ))}
  </>
);

export default RecipeTable;
