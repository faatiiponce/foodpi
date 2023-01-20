import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const GET_DIETS_TYPES = "GET_DIETS_TYPES";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_DIET_TYPE = "FILTER_DIET_TYPE";
export const ORDER_ALPHABETICAL = "ORDER_ALPHABETICAL";
export const ORDER_BY_HEALTHSCORE = "ORDER_BY_HEALTHSCORE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const LOADING = "LOADING";

export const SET_PAGE = "SET_PAGE";
export const CLEAN_RECIPES = "CLEAN_RECIPES";

export function loading() {
  return {
    type: LOADING,
  };
}

export function getRecipes() {
  return async function (dispatch) {
    try {
      const allRecipes = await axios.get("/recipes");
      return dispatch({
        type: GET_RECIPES,
        payload: allRecipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//SEARCH BAR
export function getRecipeByName(name) {
  return async function (dispatch) {
    try {
      const recipeName = await axios.get(`/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: recipeName.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: [],
      });
    }
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      const recipeDetail = await axios.get(`/recipes/${id}`);
      return dispatch({
        type: GET_RECIPE_DETAIL,
        payload: recipeDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//FORM
export function getDietsTypes() {
  return async function (dispatch) {
    try {
      const dietsTypes = await axios.get("/diets");
      return dispatch({
        type: GET_DIETS_TYPES,
        payload: dietsTypes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postRecipe(payload) {
  return async function () {
    try {
      const newRecipe = await axios.post("/recipes", payload);
      return newRecipe;
    } catch (error) {
      console.log(error);
    }
  };
}

//FILTER

export function filterDietType(payload) {
  return {
    type: FILTER_DIET_TYPE,
    payload,
  };
}

//ORDERING

export function orderAlphabetical(payload) {
  return {
    type: ORDER_ALPHABETICAL,
    payload,
  };
}

export function orderByHealthScore(payload) {
  return {
    type: ORDER_BY_HEALTHSCORE,
    payload,
  };
}

export function cleanDetail() {
  return {
    type: CLEAR_DETAIL,
    payload: [],
  };
}
export function cleanRecipes() {
  return {
    type: CLEAN_RECIPES,
    payload: [],
  };
}

export function setPage(payload) {
  return {
    type: SET_PAGE,
    payload,
  };
}
