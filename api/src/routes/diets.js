const { Router } = require("express");
const axios = require("axios");
const { getAllDiets } = require("../controller/controllerDiet");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const infoApi = await getAllDiets();
    res.status(200).send(infoApi);
  } catch (error) {
    res.status(404).json("Error", error);
  }
});

module.exports = router;
