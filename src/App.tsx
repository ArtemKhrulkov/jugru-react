import * as React from "react";
import "./App.css";
import Filters from "./components/filters/Filters";
import Cards from "./components/cards/Cards";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStores } from "./hooks";

const App = observer(() => {
  const { lecturesStore } = useStores();

  useEffect(() => {
    lecturesStore.requestLectures();
  });

  return (
    <div className="App">
      <Filters />
      <Cards />
    </div>
  );
});

export default App;
