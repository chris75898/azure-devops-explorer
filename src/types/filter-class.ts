import { FilterObject } from "./filter-abstract";

export class FilterSingle extends FilterObject {
  name: string;
  description: string | undefined;

  constructor(name: string, description: string | undefined) {
    super();
    this.name = name;
    this.description = description;
  }
}
