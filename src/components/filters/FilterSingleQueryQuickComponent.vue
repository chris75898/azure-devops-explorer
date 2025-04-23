<script lang="ts" setup>
import type { FilterObject } from '@/types/filter-abstract';
import { defineProps } from 'vue';

const emit = defineEmits(['onClick', 'onEdit']);

interface Props {
  filterObject: FilterObject
}
const props = defineProps<Props>();

const onClick = function () {
  emit('onClick');
}
const onEdit = function () {
  emit('onEdit');
}
</script>
<template>
  <div @onclick="onClick()">
    <h4>
      {{ props.filterObject.name }}
      <i @click="onEdit()" class="bi bi-pencil-square"></i>
    </h4>
    <h5>
      <span v-if="props.filterObject.enabled === false">Disabled</span>
    </h5>
  </div>
</template>
