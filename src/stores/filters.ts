import { defineStore } from 'pinia'
import type { FilterObject } from '@/types/filter-abstract';
import type { FilterType } from '@/types/filter-enums';

export const useFiltersStore = defineStore('filters', () => {
  const filters = new Map<string, FilterObject>();

  const getFilterById = (id: string) => {
    return filters.get(id);
  }
  const getFilterByType = (filterType: FilterType) => {
    return [...filters.values()].filter(p => p.filterType === filterType);
  }
  return { getFilterById, getFilterByType }
})
