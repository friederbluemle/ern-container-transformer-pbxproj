export interface BuildSettings {
  /**
   * Configuration(s) for which these build settings apply.
   * For example [ 'Debug' , 'Release' ]
   */
  configurations: string[]

  /**
   * Build settings as key values pairs
   */
  settings: { [key: string]: string }
}
