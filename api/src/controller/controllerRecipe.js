const { Recipe, Diet } = require("../db");

const postNewRecipe = async (objRecipe) => {
  try {
    const { name, summary, healthScore, steps, image, diets } = objRecipe;
    const recipe = {
      name,
      summary,
      healthScore,
      steps,
      image,
    };
    const dietsTypes = await Diet.findAll({
      where: { name: diets },
    });
    const newRecipe = await Recipe.create(recipe);
    await newRecipe.addDiet(dietsTypes);
    return newRecipe;
  } catch (error) {
    console.log("Error in postNewRecipe", error);
  }
};

module.exports = {
  postNewRecipe,
};
