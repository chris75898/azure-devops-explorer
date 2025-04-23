import { computed } from 'vue'
import { defineStore } from 'pinia'
import type { DevOpsObject } from '@/types/devops-abstract'
import type { ObjectType } from "@/types/devops-enums";
import { ProjectReference } from '@/types/devops-class'
import { useConfigStore } from "./config";
import { getPersonalAccessTokenHandler, WebApi } from 'azure-devops-node-api';

export const useDevOpsStore = defineStore('devops', () => {
  const devopsObjects: DevOpsObject[] = [];
  const configStore = useConfigStore();

  const queryAll = (force: boolean) => {
    return new Promise(async (resolve) => {
      if (hasLoadedDevOpsObjects.value == false || force) {
        await queryProjects()
      }

      resolve(null);
    });
  }

  const devopsObjectsByType = function (type: ObjectType) {
    return devopsObjects.filter(p => p.DevOpsType === type);
  }

  const hasLoadedDevOpsObjects = computed(() => {
    return devopsObjects.length > 0;
  });

  const queryProjects = async () => {
    const connection = createConnection(configStore.devopsBaseUrl, configStore.devopsPat);

    const coreApi = await connection.getCoreApi();
    const allProjects = await coreApi.getProjects()

    for (const eachProject of allProjects) {
      const devopsObject = new ProjectReference(eachProject)
      devopsObjects.push(devopsObject);
    }
  }
  const createConnection = (devopsUrl: string, pat: string): WebApi => {
    const authHandler = getPersonalAccessTokenHandler(pat)
    const connection = new WebApi(devopsUrl, authHandler);

    return connection;
  }

  const testConnection = async (devopsUrl: string, pat: string): Promise<boolean> => {
    return new Promise(async (resolve) => {
      const connection = createConnection(devopsUrl, pat);
      const core = await connection.getCoreApi();
      const projects = await core.getProjects(null, 1);
      resolve(projects.length > 0);
    });
  }
  return { queryAll, hasLoadedDevOpsObjects, devopsObjectsByType, testConnection }
})
