import * as React from "react";
import { TalksStore } from "../stores/TalksStore";

export const storesContext = React.createContext({
  lecturesStore: new TalksStore(),
});
