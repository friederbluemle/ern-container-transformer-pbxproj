import fs from 'fs'
import path from 'path'
import xcode from 'xcode-ern'
import { globAsync } from './glob-async'
import { AddProject } from './types'
import { getIosProject } from './getIosProject'

export const addProject = async (conf: AddProject) => {
  const targetPbxProjPath =
    path.extname(conf.targetProjectPath) === '.xcodeproj'
      ? path.join(conf.targetProjectPath, 'project.pbxproj')
      : conf.targetProjectPath

  const sourceXcodeProjPath =
    path.extname(conf.sourceProjectPath) === '.pbxproj'
      ? path.join(conf.sourceProjectPath, '..')
      : conf.sourceProjectPath

  const paths = await globAsync(targetPbxProjPath)

  for (const p of paths) {
    // First, add any missing section in the target pbxproj
    // This is necessary for proper parsing and modification of
    // the pbxproj with the xcode-ern library
    xcode.pbxProjFileUtils().addMissingSectionsToPbxProj(p)

    const iosProject = await getIosProject(p)
    iosProject.addProject(sourceXcodeProjPath)
    fs.writeFileSync(p, iosProject.writeSync())
  }
}
