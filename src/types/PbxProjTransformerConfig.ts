import { AddProject } from './AddProject'
import { AddTargetDependency } from './AddTargetDependency'
import { SetBuildSettings } from './SetBuildSettings'

export interface PbxProjTransformerConfig {
  addProjects: AddProject[]
  addTargetDependencies: AddTargetDependency[]
  setBuildSettings: SetBuildSettings[]
}
