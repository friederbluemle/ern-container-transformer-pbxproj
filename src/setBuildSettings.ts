import fs from 'fs'
import path from 'path'
import xcode from 'xcode-ern'
import { globAsync } from './glob-async'
import { getIosProject } from './getIosProject'
import { SetBuildSettings } from './types/SetBuildSettings'

export const setBuildSettings = async (conf: SetBuildSettings) => {
  const targetPbxProjPath =
    path.extname(conf.targetProjectPath) === '.xcodeproj'
      ? path.join(conf.targetProjectPath, 'project.pbxproj')
      : conf.targetProjectPath

  const paths = await globAsync(targetPbxProjPath)

  for (const p of paths) {
    // First, add any missing section in the target pbxproj
    // This is necessary for proper parsing and modification of
    // the pbxproj with the xcode-ern library
    xcode.pbxProjFileUtils().addMissingSectionsToPbxProj(p)

    const iosProject = await getIosProject(p)

    for (const buildSettingsEntry of conf.buildSettings) {
      for (const buildType of buildSettingsEntry.configurations) {
        for (const key of Object.keys(buildSettingsEntry.settings)) {
          iosProject.updateBuildProperty(
            key,
            buildSettingsEntry.settings[key],
            buildType
          )
        }
      }
    }

    fs.writeFileSync(p, iosProject.writeSync())
  }
}
