# iOS pbxproj Container Transformer

This transformer can be used to patch one or more pbxproj (iOS project file) included in the Container, in specific ways.

For now this transformer only allows adding projects to other projects, as well as adding other project targets as target dependencies of any project.

## Inputs

- `containerPath` : Path to the Container to transform
- `addProjects` : Array of `AddProject` objects (see below)
- `addTargetDependencies` : Array of `AddTargetDependency` objects (see below)

## Patching directives objects

#### `AddProject`

Add a project to one or more other target projects.

```typescript
{
  /**
   * Relative path to the target project in which
   * to add another project.
   * The path is relative to the Container root directory.
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
```

#### `AddTargetDependency`

Add one or more native targets from a project, to one or more other projects.

```typescript
 {
  /**
   * Relative path to the target project in which
   * The path is relative to the Container root directory.
   * Can also be a glob. If multiple projects are
   * matching the glob pattern, then all of these
   * projects will be transformed sequentially.
   */
  targetProjectPath: string

  /**
   * Absolute or relative path (relative to the parent directory
   * of the target .xcodeproj directory) to the project containing
   * the native target to add as a dependency.
   */
  sourceProjectPath: string

  /**
   * Array of native targets from the source project to
   * add as target dependencies in the target project(s).
   */
  sourceNativeTargets: string[]
}
```

## Usage

### With `ern transform-container` CLI command

```bash
$ ern transform-container --containerPath [pathToContainer] -t pbxproj -c '{"addProjects":[...], "addTargetDependencies":[...]}'
```

Instead of passing the whole configuration on the command line for `--config/-c`, it is also possible to use a file path of a json file holding the configuration.

### With Cauldron

To automatically transform the Cauldron generated Containers of a target native application and platform, you can add a transformer entry in the Cauldron in the Container generator configuration object as follow :

```json
"transformers": [
  {
    "name": "pbxproj",
    "extra": {
      "addProjects": [...],
      "addTargetDependencies" : [...]
    }
  }
]
```

### Programmatically

```js
import PbxProjTransformer from 'ern-container-transformer-pbxproj'
const transformer = new BuildConfigTransformer()
transformer.transform(
  {
    /* Local file system path to the Container */
    containerPath: string
    /* Extra data specific to this publisher */
    extra?: {
      addProjects: AddProject[],
      addTargetDependencies: AddTargetDependency[]
    }
  }
})
```