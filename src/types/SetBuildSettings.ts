import { BuildSettings } from './BuildSettings'

export interface SetBuildSettings {
  /**
   * Absolute path to the target project in which
   * to add a target dependency from another project
   * Can also be a glob. If multiple projects are
   * matching the glob pattern, then all of these
   * projects will be transformed sequentially.
   */
  targetProjectPath: string

  /**
   * Array of native targets from the source project to
   * add as target dependencies in the target project(s).
   */
  buildSettings: BuildSettings[]
}
