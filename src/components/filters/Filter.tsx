import * as React from "react";
import "./Filters.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";

const Filter = observer(() => {
  const { lecturesStore } = useStores();
  const { onFilterTalks, onFilterClear } = lecturesStore;

  return (
    <div className="App-filter-textInputAndButton">
      <input className="App-filter-textInput" type="text" onChange={onFilterTalks} />
      <input type="button" value={"Reset Filters"} onClick={onFilterClear} />
    </div>
  );
});

export default Filter;
