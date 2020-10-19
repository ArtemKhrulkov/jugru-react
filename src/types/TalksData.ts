export interface TalksData {
  id: string;
  title: string;
  speaker: string;
  tags: string[];
}

export interface TalksApiData {
  data: TalksData[];
}

export interface CheckboxesFilterData {
  checkbox: EventTarget & HTMLInputElement;
  value: string;
}
