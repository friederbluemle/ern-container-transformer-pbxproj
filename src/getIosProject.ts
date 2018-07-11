import xcode from 'xcode-ern'

export const getIosProject = (projectPath: string): Promise<any> => {
  const project = xcode.project(projectPath)
  return new Promise((resolve, reject) => {
    project.parse(err => {
      err ? reject(err) : resolve(project)
    })
  })
}
