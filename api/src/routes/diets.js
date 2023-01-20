const { Router } = require("express");
const axios = require("axios");
const { getAllDiets } = require("../controller/controllerDiet");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const infoApi = await getAllDiets(); // trae la info de todas las dietas y después se envía para mostrarla 
    res.status(200).send(infoApi);
  } catch (error) {
    res.status(404).json("Error", error);
  }
});

module.exports = router;
