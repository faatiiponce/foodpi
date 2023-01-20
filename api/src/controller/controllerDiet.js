const { Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

const getAllDiets = async () => {
  try {
    // const allRecipes = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    // );
    const allRecipes = await axios.get(
      "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/&addRecipeInformation=true&number=100"
    );
    const dietsArrays = allRecipes.data.results?.map((recipe) => recipe.diets); // de todas las recetas, va buscando las dietas y las junta en un array
    const dietsEach = dietsArrays.flat(); // .flat si hay un array adentro de otra, junta ambas
    const diets = [...new Set(dietsEach)]; //almacena los nuevos valores.

    diets.forEach((diet) => {
      Diet.findOrCreate({
        //busca o crea la dieta
        where: {
          name: diet,
        },
      });
    });
    return diets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllDiets };
