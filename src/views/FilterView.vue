<script lang="ts" setup>
import FilterSingleQueryQuickComponent from '@/components/filters/FilterSingleQueryQuickComponent.vue';
import { useFiltersStore } from '@/stores/filters';
import type { FilterObject } from '@/types/filter-abstract';
import { FilterType } from '@/types/filter-enums';
import { computed, ref } from 'vue';

const filterStore = useFiltersStore();
const editingFilterObject = ref<FilterObject | null>(null);
const isEditing = computed(() => editingFilterObject.value !== null)

// Convert to storing objects here
// need to store the current objects somehow


const createNewForEditing = (filterType: FilterType) => {
  const filter = {
    filterType: filterType
  } as FilterObject;

  editingFilterObject.value = filter;
}

</script>
<template>
  <div data-bs-backdrop="false" class="offcanvas offcanvas-bottom" tabindex="-1" id="filterOffCanvas"
    aria-labelledby="filterOffCanvasLabel">
    <div class="offcanvas-header">
      Filters:
      <div aria-controls="filterOffCanvas" class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#filterOffCanvas">TOGGLE
      </div>
    </div>
    <div class="offcanvas-body small">
      <div v-if="isEditing">
        <h4>Editing</h4>
        <input placeholder="Name" v-if="editingFilterObject" v-model="editingFilterObject.name">

        <FilterSingleQueryEditComponent v-if="editingFilterObject?.filterType == FilterType.SingleObjectFilter">
        </FilterSingleQueryEditComponent>
      </div>
      <div v-else>
        <h4>
          Single-Object Filters:
          <i @click="createNewForEditing(FilterType.SingleObjectFilter)" class="bi bi-plus-square"></i>
        </h4>
        <FilterSingleQueryQuickComponent @onEdit="editingFilterObject = filter" :filter-object="filter" :key="filter.id"
          v-for="filter in filterStore.getFilterByType(FilterType.SingleObjectFilter)" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.offcanvas-header {
  transform: translateY(-100%);
  visibility: visible;
  border-top: var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);
  transition: var(--bs-offcanvas-transition);
  ;
}

.offcanvas.show>.offcanvas-header,
.offcanvas.showing>.offcanvas-header,
.offcanvas.hiding>.offcanvas-header {
  transform: none;
  border-top: none;
}
</style>
