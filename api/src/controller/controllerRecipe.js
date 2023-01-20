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
      //busca todas las dietas
      where: { name: diets },
    });
    const newRecipe = await Recipe.create(recipe); // creala nueva receta
    await newRecipe.addDiet(dietsTypes); // se le agregan las dietas a la receta
    return newRecipe; //devuelve la receta con las dietas creadas.
  } catch (error) {
    console.log("Error in postNewRecipe", error);
  }
};

module.exports = {
  postNewRecipe,
};
