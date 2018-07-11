import glob from 'glob'

export const globAsync = async (
  pattern: string,
  options?: any
): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    glob(pattern, options, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
