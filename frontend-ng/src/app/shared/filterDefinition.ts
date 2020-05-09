import {Artifact} from "./generated/domain";


export interface FilterDefinition {
  id: string;
  filterFunction: FilterFunction;
}


export type FilterFunction = (value: Artifact) => boolean;
