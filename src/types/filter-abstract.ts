import { uuid } from 'vue-uuid';
import type { FilterType } from './filter-enums';

export abstract class FilterObject {
  constructor() {
    this.id = uuid.v4();
  }
  id: string;
  abstract name: string;
  abstract description: string | undefined;
  enabled = true;
  abstract filterType: FilterType;
}
