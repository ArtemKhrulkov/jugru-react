import * as React from "react";
import Checkboxes from "./Checkboxes";
import Filter from "./Filter";
import "./Filters.css";
import { observer } from "mobx-react-lite";

const Filters = observer(() => {
  return (
    <header className="App-filter-header">
      <Checkboxes />
      <Filter />
    </header>
  );
});

export default Filters;
