import {Artifact} from "./generated/domain";


export interface FilterDefinition {
  id: string;
  filterFunction: FilterFunction;
  description: string;
  clearFilterCallback: ClearFilterCallbackFunction;
}


export type FilterFunction = (value: Artifact) => boolean;
export type ClearFilterCallbackFunction = () => void;
