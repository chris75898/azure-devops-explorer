import type { ObjectType } from "./devops-enums";
import * as CoreInterfaces from "azure-devops-node-api/interfaces/CoreInterfaces";
import * as ReleaseInterfaces from "azure-devops-node-api/interfaces/ReleaseInterfaces";

export abstract class DevOpsObject {
  parent: DevOpsObject | undefined;
  abstract name(): string;
  abstract id(): string;
  abstract DevOpsType: ObjectType;
  abstract object: CoreInterfaces.TeamProjectReference | ReleaseInterfaces.ReleaseDefinition | ReleaseInterfaces.ReleaseEnvironment;
  _children: DevOpsObject[] = [];
  children(): DevOpsObject[] {
    return this._children;
  }
}
