const { Router } = require("express");
const { getAllRecipes, getNameRecipe } = require("../controller/controllerDB");
const { postNewRecipe } = require("../controller/controllerRecipe");
const { Recipe } = require("../db");
const router = Router();

// router.get("/name", async (req, res) => {
//   try {
//     const info = await getNameRecipe();
//     res.status(201).send(info);
//   } catch (error) {
//     res.status(404).send("Error");
//   }
// });

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let info = await getAllRecipes(); // trae la info de controller, todas las recetas

    if (name) {
      let recipeName = info.filter(
        (r) => r.name.toLowerCase().includes(name.toLowerCase()) // quita las mayusculas tanto de la busqueda y de la receta para que no interfiera en la busqueda
      );
      recipeName.length
        ? res.status(200).send(recipeName)
        : res.status(201).send(`NOT FOUND`);
      // todo lo anterior, buscaria si hay una receta con ese nombre
    } else {
      res.status(200).send(info);
    }
  } catch (error) {
    console.log("Error in route getQueryname", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const infoApi = await getAllRecipes();
    if (id) {
      const recipeById = infoApi.find((recipe) => recipe.id == id);
      recipeById
        ? res.status(200).json(recipeById)
        : res.status(404).json("Not found recipe detail");
    } // busca las recetas por el id
  } catch (error) {
    res.status(404).json("Error in route getId Recipe", error);
  }
});

router.post("/", async (req, res) => {
  const objRecipe = req.body;
  console.log(objRecipe);
  try {
    const postRecipe = await postNewRecipe(objRecipe);
    res.status(201).json(postRecipe);
  } catch (error) {
    res.status(404).json(`Error in route post Recipe ${error}`);
  }
  // realiza el post de la nueva receta
});

module.exports = router;
