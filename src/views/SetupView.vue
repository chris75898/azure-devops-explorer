<script lang="ts" setup>
import { useConfigStore } from '@/stores/config';
import { useDevOpsStore } from '@/stores/devops';
import router from "@/router"
import { computed, ref, watch, type Ref } from 'vue';

const configStore = useConfigStore();
const devopsStore = useDevOpsStore();

const baseUrl = ref(configStore.devopsBaseUrl);
const devOpsPat = ref(configStore.devopsPat);
const requiredSettings = [baseUrl, devOpsPat];
const hasBeenTested = ref(false);

const hasValueChanged = (value: Ref<string, string>, prevValue: Ref<string, string>) => {
  if (value.value != prevValue.value) {
    hasBeenTested.value = false;
  }
}
requiredSettings.forEach(setting => {
  watch(
    () => setting,
    hasValueChanged
  )
});

const requiredSettingsHaveValues = computed(() => requiredSettings.every(s => s.value))
const canSaveData = computed(() => requiredSettingsHaveValues.value && hasBeenTested.value)


const save = () => {
  if (requiredSettingsHaveValues.value && canSaveData.value) {
    configStore.devopsBaseUrl = baseUrl.value;
    configStore.devopsPat = devOpsPat.value;

    router.push("/explore")
  }
}
const testDevops = async () => {
  if (requiredSettingsHaveValues.value) {
    // todo show testing
    const result = await devopsStore.testConnection(baseUrl.value, devOpsPat.value)
    hasBeenTested.value = result;
    // todo hide testing
  }
}
</script>
<template>
  <div class="card mx-3 my-5">
    <div class="card-body">
      <h5 class="card-title">Settings</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        This information is required to connect to Azure Devops
      </h6>

      <form>
        <div class="mb-3">
          <label for="baseUrl" class="form-label">Azure Devops Base URL</label>
          <input v-model="baseUrl" type="url" class="form-control" id="baseUrl" aria-describedby="baseUrlHelp">
          <div id="baseUrlHelp" class="form-text">The primary URL for accessing your Azure DevOps organization is
            https://dev.azure.com/{yourorganization}</div>
        </div>
        <div class="mb-3">
          <label for="apiSecret" class="form-label">API PAT</label>
          <input v-model="devOpsPat" class="form-control" id="apiSecret" aria-describedby="apiSecretHelp">
          <div id="apiSecretHelp" class="form-text">Read-only access is required</div>
        </div>

        <button @click="router.push({ path: '/' })" class="btn btn-primary">Cancel</button>
        <button :disabled="!requiredSettingsHaveValues" @click="testDevops()" class="btn btn-primary">Test</button>
        <button :disabled="!canSaveData" @click="save()" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>
