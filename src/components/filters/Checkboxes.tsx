import * as React from "react";
import "./Filters.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { ChangeEvent } from "react";
import { filterArrayWithCheckboxes, filterArrayWithString } from "../../helpers";

const checkboxesButtons = ["RU", "EN", "HOT", "INTERMEDIATE", "ADVANCED", "HARDCORE", "ACADEMIC"];

const Checkboxes = observer(() => {
  const { talksStore } = useStores();

  const onFilterCheckBoxClick = (e: ChangeEvent<HTMLInputElement>): void => {
    const talks = talksStore.getTalks();
    const checkboxes = talksStore.getFilterCheckboxes();

    if (e.target.checked) {
      talksStore.pushFilterCheckboxes({ checkbox: e.target, value: e.target.value.toLowerCase() });
    } else {
      const idx = checkboxes.findIndex(({ value }) => value === e.target.value.toLowerCase());
      talksStore.spliceFilterCheckboxes(idx);
    }

    const filterInput = talksStore.getFilterInput();
    const filteredTalks = talksStore.getFilteredTalks();

    talksStore.setFilteredTalks(filterArrayWithCheckboxes(talks, checkboxes));

    if (filteredTalks.length === 0) {
      if (filterInput) {
        talksStore.setFilteredTalks(filterArrayWithString(filterInput.value, talks));
      } else {
        talksStore.setFilteredTalks(talks);
      }
    }
  };

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
