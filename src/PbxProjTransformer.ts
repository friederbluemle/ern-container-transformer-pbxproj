import path from 'path'
import { PbxProjTransformerConfig } from './types'
import { addProject } from './addProject'
import { addTargetDependency } from './addTargetDependency'

export default class PbxProjTransformer {
  /**
   * Name of this transformer
   */
  get name(): string {
    return 'pbxproj'
  }

  /**
   * Supported platforms
   */
  get platforms(): string[] {
    return ['ios']
  }

  /**
   * Transform the container
   */
  public async transform({
    containerPath,
    extra,
  }: {
    containerPath: string
    extra?: PbxProjTransformerConfig | PbxProjTransformerConfig[]
  }) {
    const extraArr: PbxProjTransformerConfig[] =
      extra instanceof Array
        ? (extra as PbxProjTransformerConfig[])
        : ([extra] as PbxProjTransformerConfig[])

    for (const conf of extraArr) {
      if (conf.addProjects) {
        for (const addProjectConf of conf.addProjects) {
          await addProject({
            sourceProjectPath: addProjectConf.sourceProjectPath,
            targetProjectPath: path.join(
              containerPath,
              addProjectConf.targetProjectPath
            ),
          })
        }
      }
    }

    for (const conf of extraArr) {
      if (conf.addTargetDependencies) {
        for (const addTargetDependencyConf of conf.addTargetDependencies) {
          await addTargetDependency({
            sourceProjectPath: addTargetDependencyConf.sourceProjectPath,
            targetProjectPath: path.join(
              containerPath,
              addTargetDependencyConf.targetProjectPath
            ),
            sourceNativeTargets: addTargetDependencyConf.sourceNativeTargets,
          })
        }
      }
    }
  }

  //
  // TODO
  public validate(extraArr: PbxProjTransformerConfig[]) {}

  public throwError(msg: string) {
    throw new Error(`[BuildConfigurationTransformer] ${msg}`)
  }
}
