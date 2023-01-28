const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getInfoRecipe = async () => {
  try {
    const infoApi = await axios.get(
      // `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const data = infoApi.data.results;
    const infoRecipe = data?.map((recipe) => {
      // si hay información en infoApi, va a crear un nuevo arreglo con toda la receta.
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        image: recipe.image,
        dishTypes: recipe.dishTypes,
        steps: recipe.analyzedInstructions[0]?.steps.map((ele) => {
          // crea un nuevo array con los pasos
          return {
            number: ele.number,
            step: ele.step,
          };
        }),
      };
    });
    return infoRecipe;
  } catch (error) {
    console.log("Error", error);
  }
};

// const getNameRecipe = async () => {
//   try {
//     const infoApi = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
//     );
//     const data = infoApi.data.results;
//     const infoName = data?.map((recipe) => {
//       console.log(recipe);
//       return {
//         title: recipe.title,
//       };
//     });
//     return infoName;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

const getInfoRecipeDB = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      //Busca las recetas en la base de datos
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2)); //convierte cualquier texto en JSON
    dato.forEach((el) => (el.diets = el.diets.map((el) => el.name))); // con forEach se ejecuta la función en cada array que se crea de diets.

    return dato;
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async () => {
  // Esta función se encarga de juntar la información de la página con la de base de datos.
  try {
    const infoApi = await getInfoRecipe();
    const dataDB = await getInfoRecipeDB();
    const allRecipes = [...infoApi, ...dataDB];
    return allRecipes;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getInfoRecipe,
  getAllRecipes,
  getNameRecipe,
};
