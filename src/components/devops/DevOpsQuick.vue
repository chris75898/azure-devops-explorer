<script setup lang="ts">
import { defineProps } from 'vue';
import type { DevOpsObject } from '@/types/devops-abstract'
interface Props {
  object: DevOpsObject;
}
const props = defineProps<Props>();
</script>

<template>
  <div>
    <h3>{{ props.object.name() }}</h3>
    <h5>{{ props.object.DevOpsType }}</h5>
  </div>
</template>
