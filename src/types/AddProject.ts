export interface AddProject {
  /**
   * Absolute path to the target project in which
   * to add another project.
   * Can also be a glob. If multiple projects are
   * matching the glob pattern, then all of these
   * projects will be transformed sequentially.
   */
  targetProjectPath: string

  /**
   * Absolute or relative path (relative to the parent directory
   * of the target .xcodeproj directory)
   */
  sourceProjectPath: string
}
