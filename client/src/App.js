import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./componentes/LandingPage/LandingPage";
import Home from "./componentes/Home/Home";
import CreateRecipe from "./componentes/CreateRecipe/CreateRecipe";
import RecipeDetail from "./componentes/RecipeDetail/RecipeDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/recipes"} component={CreateRecipe} />
        <Route exact path={"/home/:id"} component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
