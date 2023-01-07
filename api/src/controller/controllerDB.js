const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const getInfoRecipe = async () => {
  try {
    const infoApi = await axios.get(
      `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const data = infoApi.data.results;
    const infoRecipe = data?.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        diets: recipe.diets,
        image: recipe.image,
        steps: recipe.analyzedInstructions[0]?.steps.map((ele) => {
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

const getInfoRecipeDB = async () => {
  try {
    const dbInfo = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2));
    dato.forEach((el) => (el.diets = el.diets.map((el) => el.name)));

    return dato;
  } catch (error) {
    console.log(error);
  }
};

const getAllRecipes = async () => {
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
};
