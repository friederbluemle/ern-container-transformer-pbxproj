import fs from 'fs'
import path from 'path'
import xcode from 'xcode-ern'
import { globAsync } from './glob-async'
import { AddTargetDependency } from './types'
import { getIosProject } from './getIosProject'

export const addTargetDependency = async (conf: AddTargetDependency) => {
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
    // the pbxproh with the xcode-ern library
    xcode.pbxProjFileUtils().addMissingSectionsToPbxProj(p)

    const iosProject = await getIosProject(p)
    iosProject.addTargetDependencies({
      sourceProjectPath: sourceXcodeProjPath,
      sourceNativeTargets: conf.sourceNativeTargets,
    })

    fs.writeFileSync(p, iosProject.writeSync())
  }
}
