import * as React from "react";
import "./Filters.css";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { filterArrayWithCheckboxes, filterArrayWithEvent } from "../../helpers";
import { CheckboxesFilterData, TalksData } from "../../types/TalksData";

const Filter = observer(() => {
  const { talksStore } = useStores();
  const { clearFilters } = talksStore;

  const observableTalks = talksStore.getTalks();
  const observableFilterCheckboxes = talksStore.getFilterCheckboxes();
  const observableFilteredTalks = talksStore.getFilteredTalks();

  const [talks, setTalks] = useState<TalksData[]>([]);
  const [filterCheckboxes, setFilterCheckboxes] = useState<CheckboxesFilterData[]>([]);
  const [filteredTalks, setFilteredTalks] = useState<TalksData[]>([]);

  useEffect(() => {
    setTalks(observableTalks);
    setFilterCheckboxes(observableFilterCheckboxes);
    setFilteredTalks(observableFilteredTalks);
  }, [observableTalks, observableFilterCheckboxes, observableFilteredTalks]);

  const onFilterTalks = (e: ChangeEvent<HTMLInputElement>): void => {
    talksStore.setFilterInput(e.target);
    const filteredArray = filterArrayWithCheckboxes(talks, filterCheckboxes);

    if (filterCheckboxes.length > 0 && e.target.value !== "") {
      talksStore.setFilteredTalks(filterArrayWithEvent(e, filteredTalks.length > 0 ? filteredTalks : filteredArray));
    } else if (filterCheckboxes.length > 0 && e.target.value === "") {
      talksStore.setFilteredTalks(filterArrayWithEvent(e, filteredArray));
    } else {
      talksStore.setFilteredTalks(filterArrayWithEvent(e, talks));
    }
  };

  return (
    <div className="App-filter-textInputAndButton">
      <input className="App-filter-textInput" type="text" onChange={onFilterTalks} />
      <input type="button" value={"Reset Filters"} onClick={clearFilters} />
    </div>
  );
});

export default Filter;
