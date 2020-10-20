import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import { CheckboxesFilterData, TalksData } from "../types/TalksData";
import { ChangeEvent } from "react";

export class TalksStore {
  private talks: TalksData[] = [];
  private filteredTalks: TalksData[] = [];
  private filterCheckboxes: CheckboxesFilterData[] = [];
  private filterInput: HTMLInputElement | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  requestTalks = async (): Promise<boolean> => {
    const talks: TalksData[] = await ApiService.getTalks();
    this.setTalks(talks);
    return true;
  };

  setTalks = (value: TalksData[]): void => {
    this.talks = value;
  };

  getTalks = (): TalksData[] => {
    return this.talks;
  };

  getFilteredTalks = (): TalksData[] => {
    return this.filteredTalks;
  };

  filterArrayWithCheckboxes = () => {
    return this.talks.filter((lecture: TalksData) =>
      this.filterCheckboxes.some(({ value }) => lecture.tags.includes(value))
    );
  };

  filterArrayWithEvent = (e: ChangeEvent<HTMLInputElement>, arr: TalksData[]): void => {
    this.filteredTalks = arr.filter(
      (lecture: TalksData) =>
        lecture.speaker.toLowerCase().includes(e.target.value.toLowerCase()) ||
        lecture.tags.some((value: string) => value.includes(e.target.value.toLowerCase())) ||
        lecture.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
  };

  filterArrayWithString = (searchString: string, arr: TalksData[]): void => {
    this.filteredTalks = arr.filter(
      (lecture: TalksData) =>
        lecture.speaker.toLowerCase().includes(searchString.toLowerCase()) ||
        lecture.tags.some((value: string) => value.includes(searchString.toLowerCase())) ||
        lecture.title.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  onFilterTalks = (e: ChangeEvent<HTMLInputElement>): void => {
    this.filterInput = e.target;
    const filteredArray = this.filterArrayWithCheckboxes();

    if (this.filterCheckboxes.length > 0 && e.target.value !== "") {
      this.filterArrayWithEvent(e, this.filteredTalks.length > 0 ? this.filteredTalks : filteredArray);
    } else if (this.filterCheckboxes.length > 0 && e.target.value === "") {
      this.filterArrayWithEvent(e, filteredArray);
    } else {
      this.filterArrayWithEvent(e, this.talks);
    }
  };

  onFilterCheckBoxClick = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      this.filterCheckboxes.push({ checkbox: e.target, value: e.target.value.toLowerCase() });
    } else {
      const idx = this.filterCheckboxes.findIndex(({ value }) => value === e.target.value.toLowerCase());
      this.filterCheckboxes.splice(idx, 1);
    }

    this.filteredTalks = this.filterArrayWithCheckboxes();

    if (this.filteredTalks.length === 0) {
      if (this.filterInput) {
        this.filterArrayWithString(this.filterInput.value, this.talks);
      } else {
        this.filteredTalks = this.talks;
      }
    }
  };

  onFilterClear = () => {
    if (this.filterInput) this.filterInput.value = "";
    this.filterInput = undefined;
    this.filterCheckboxes.forEach(({ checkbox }) => (checkbox.checked = !checkbox.checked));
    this.filterCheckboxes = [];
    this.filteredTalks = this.talks;
  };
}
