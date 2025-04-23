<script lang="ts" setup>
import { QueryBuilderComponent, type ColumnsModel } from "@syncfusion/ej2-vue-querybuilder";
//, ColumnDirective, ColumnsDirective,
import { defineProps } from 'vue';

interface Props {
  dataSource: unknown[],
  columns?: ColumnsModel[] | undefined
}
const props = defineProps<Props>();
</script>
<template>
  <QueryBuilderComponent :dataSource="props.dataSource"></QueryBuilderComponent>
</template>
<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-querybuilder/styles/material.css";
</style>
