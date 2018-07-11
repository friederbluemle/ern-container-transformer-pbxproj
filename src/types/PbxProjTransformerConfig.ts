import { AddProject } from './AddProject'
import { AddTargetDependency } from './AddTargetDependency'

export interface PbxProjTransformerConfig {
  addProjects: AddProject[]
  addTargetDependencies: AddTargetDependency[]
}
