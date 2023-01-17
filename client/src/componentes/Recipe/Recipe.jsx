import React from "react";
import { Link } from "react-router-dom";
import styles from "../Recipe/Recipe.module.css";

export default function Recipe({
  id,
  image,
  name,
  healthScore,
  diets,
  created,
}) {
  return (
    <div>
      {created ? (
        <Link to={`/home/${id}`}>
          <div id={styles.cardRecipe}>
            <img src={image} alt="Receta" width="300px" id={styles.image} />
            <h3 id={styles.h3}>{name}</h3>
            <div id={styles.divContainer}>
              <label>
                Health Score: <span>{healthScore}</span>
              </label>
              <img
                src="https://www.pngall.com/wp-content/uploads/11/Healthy-Care-Vector-PNG-Photo.png"
                alt="healthscore"
                width="20px"
              />
            </div>
            <label id={styles.label2}>Diets: </label>
            {diets?.map((d) => (
              <p id={styles.p} key={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </p>
            ))}
            <br />
            <br />
          </div>
        </Link>
      ) : (
        <Link to={`/home/${id}`}>
          <div id={styles.cardRecipe}>
            <img src={image} alt="Receta" width="300px" id={styles.image} />
            <h3 id={styles.h3}>{name}</h3>
            <div id={styles.divContainer}>
              <label>
                Health Score: <span>{healthScore}</span>
              </label>
              <img
                src="https://www.pngall.com/wp-content/uploads/11/Healthy-Care-Vector-PNG-Photo.png"
                alt="healthscore"
                width="20px"
              />
            </div>
            <label id={styles.label2}>Diets: </label>
            {diets?.map((d) => (
              <p id={styles.p} key={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </p>
            ))}
          </div>
        </Link>
      )}
    </div>
  );
}
