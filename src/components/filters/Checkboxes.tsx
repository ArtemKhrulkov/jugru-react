import * as React from "react";
import "./Filters.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";

const checkboxesButtons = ["RU", "EN", "HOT", "INTERMEDIATE", "ADVANCED", "HARDCORE", "ACADEMIC"];

const Checkboxes = observer(() => {
  const { lecturesStore } = useStores();
  const { onFilterCheckBoxClick } = lecturesStore;

  return (
    <div>
      {checkboxesButtons.map((label: string) => {
        return (
          <React.Fragment key={`id-${label}`}>
            <span>{label}</span>
            <input className="App-filter-checkboxes" type="checkbox" value={label} onChange={onFilterCheckBoxClick} />
          </React.Fragment>
        );
      })}
    </div>
  );
});

export default Checkboxes;
