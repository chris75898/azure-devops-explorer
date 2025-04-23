import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const devopsBaseUrl = ref("");
  const devopsPat = ref("");
  const isLoaded = ref(false);

  watch(
    () => devopsBaseUrl,
    (current, old) => {
      if (current.value != old.value) {
        isLoaded.value = false;
      }
    }
  )
  watch(
    () => devopsPat,
    (current, old) => {
      if (current.value != old.value) {
        isLoaded.value = false;
      }
    }
  )
  const areRequiredAttributesSet = computed(() => {
    const requiredProps = [devopsBaseUrl, devopsPat];
    return requiredProps.every((prop) => prop.value);
  });

  return { devopsBaseUrl, devopsPat, areRequiredAttributesSet }
}, {
  persist: true
})
