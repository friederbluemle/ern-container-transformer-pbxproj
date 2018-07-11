export interface AddTargetDependency {
  /**
   * Absolute path to the target project in which
   * to add a target dependency from another project
   * Can also be a glob. If multiple projects are
   * matching the glob pattern, then all of these
   * projects will be transformed sequentially.
   */
  targetProjectPath: string

  /**
   * Absolute or relative path (relative to the parent directory
   * of the target .xcodeproj directory) to the project containing
   * the native target(s) to add as a dependency.
   */
  sourceProjectPath: string

  /**
   * Array of native targets from the source project to
   * add as target dependencies in the target project(s).
   */
  sourceNativeTargets: string[]
}
