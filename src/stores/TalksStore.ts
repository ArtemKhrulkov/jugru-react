import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import { CheckboxesFilterData, TalksData } from "../types/TalksData";

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

  pushFilterCheckboxes = (value: CheckboxesFilterData): void => {
    this.filterCheckboxes.push(value);
  };

  spliceFilterCheckboxes = (idx: number): void => {
    this.filterCheckboxes.splice(idx, 1);
  };

  setFilterInput = (value: HTMLInputElement | undefined): void => {
    this.filterInput = value;
  };

  setFilteredTalks = (value: TalksData[]): void => {
    this.filteredTalks = value;
  };

  getTalks = (): TalksData[] => {
    return this.talks;
  };

  getFilteredTalks = (): TalksData[] => {
    return this.filteredTalks;
  };

  getFilterCheckboxes = (): CheckboxesFilterData[] => {
    return this.filterCheckboxes;
  };

  getFilterInput = (): HTMLInputElement | undefined => {
    return this.filterInput;
  };

  clearFilters = () => {
    if (this.filterInput) this.filterInput.value = "";
    this.filterInput = undefined;
    this.filterCheckboxes.forEach(({ checkbox }) => (checkbox.checked = !checkbox.checked));
    this.filterCheckboxes = [];
    this.filteredTalks = this.talks;
  };
}
