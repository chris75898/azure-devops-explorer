import { ObjectType } from "./devops-enums";
import { DevOpsObject } from "./devops-abstract";
import * as CoreInterfaces from "azure-devops-node-api/interfaces/CoreInterfaces";
import * as ReleaseInterfaces from "azure-devops-node-api/interfaces/ReleaseInterfaces";

export class ProjectReference extends DevOpsObject {
  constructor(object: CoreInterfaces.TeamProjectReference, parent: DevOpsObject | undefined = undefined) {
    super();
    this.object = object;
    this.parent = parent;
  }
  DevOpsType = ObjectType.TeamProject;
  parent: DevOpsObject | undefined;
  name(): string {
    return this.object.name || "";
  }
  id(): string {
    return this.object.id || "";
  }
  object: CoreInterfaces.TeamProjectReference;
}

export class ReleaseDefinition extends DevOpsObject {
  constructor(object: ReleaseInterfaces.ReleaseDefinition, parent: DevOpsObject) {
    super();
    this.object = object;
    this.parent = parent;
  }
  DevOpsType = ObjectType.ReleaseDefinition;
  parent: DevOpsObject;
  name(): string {
    return this.object.name || "";
  }
  id(): string {
    return (this.object.id || "").toString();
  }
  object: ReleaseInterfaces.ReleaseDefinition;
}

export class Environment extends DevOpsObject {
  constructor(object: ReleaseInterfaces.ReleaseEnvironment, parent: DevOpsObject) {
    super();
    this.object = object;
    this.parent = parent;
  }
  DevOpsType = ObjectType.ReleaseDefinition;
  parent: DevOpsObject;
  name(): string {
    return this.object.name || "";
  }
  id(): string {
    return (this.object.id || "").toString();
  }
  object: ReleaseInterfaces.ReleaseEnvironment;
}
