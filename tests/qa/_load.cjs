// Compiles an ES module from src/ into memory (same approach as tests/metadata.test.cjs)
const Module = require('node:module')
const path = require('node:path')
const esbuild = require('esbuild')
const projectRoot = path.resolve(__dirname, '..', '..')
module.exports = function load(entry) {
  const result = esbuild.buildSync({
    absWorkingDir: projectRoot, entryPoints: [entry], bundle: true, write: false,
    platform: 'node', format: 'cjs', loader: { '.js': 'jsx' }, jsx: 'automatic',
  })
  const filename = path.join(projectRoot, 'tests', 'qa', `${path.basename(entry)}-in-memory.cjs`)
  const m = new Module(filename, module)
  m.filename = filename
  m.paths = Module._nodeModulePaths(projectRoot)
  m._compile(result.outputFiles[0].text, filename)
  return m.exports
}
