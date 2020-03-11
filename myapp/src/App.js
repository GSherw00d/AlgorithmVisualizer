import React from "react";
import Grid from "./components/Grid.js";
import SelectionBar from "./components/SelectionBar.js";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.App}>
      <SelectionBar />
      <Grid />
    </div>
  );
}

export default App;
