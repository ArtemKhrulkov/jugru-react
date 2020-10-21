import { CheckboxesFilterData, TalksData } from "../types/TalksData";
import { ChangeEvent } from "react";

export const filterArrayWithCheckboxes = (talks: TalksData[], filterCheckboxes: CheckboxesFilterData[]) => {
  return talks.filter((lecture: TalksData) => filterCheckboxes.some(({ value }) => lecture.tags.includes(value)));
};

export const filterArrayWithEvent = (e: ChangeEvent<HTMLInputElement>, arr: TalksData[]): TalksData[] => {
  return arr.filter(
    (lecture: TalksData) =>
      lecture.speaker.toLowerCase().includes(e.target.value.toLowerCase()) ||
      lecture.tags.some((value: string) => value.includes(e.target.value.toLowerCase())) ||
      lecture.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
};

export const filterArrayWithString = (searchString: string, arr: TalksData[]): TalksData[] => {
  return arr.filter(
    (lecture: TalksData) =>
      lecture.speaker.toLowerCase().includes(searchString.toLowerCase()) ||
      lecture.tags.some((value: string) => value.includes(searchString.toLowerCase())) ||
      lecture.title.toLowerCase().includes(searchString.toLowerCase())
  );
};
