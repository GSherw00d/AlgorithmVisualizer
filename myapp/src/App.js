import React from "react";
import Grid from "./components/Grid.js";
import SelectionBar from "./components/SelectionBar.js";
import style from "./App.module.css";
import ErrorMessage from "./components/ErrorMessage.js";

function App() {
  return (
    <div className={style.App}>
      <SelectionBar />
      <ErrorMessage />
      <Grid />
    </div>
  );
}

export default App;
