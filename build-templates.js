const BundleCompiler = require('@glimmer/app-compiler');
const TreeSync = require('tree-sync');
const { Builder } = require('broccoli');
const Funnel = require('broccoli-funnel');

var Rollup = require('broccoli-rollup');
var BroccoliMergeTrees = require('broccoli-merge-trees');

let app = new Funnel('my-app', {
    exclude: ['node_modules']
})

let tree = new BundleCompiler.GlimmerBundleCompiler(app,  {
  projectPath: 'my-app',
  mode: 'module-unification',
  outputFiles: {
    heapFile: 'template.gbx',
    dataSegment: 'data.js'
  },
});

let templates = new Funnel(tree, {
    include: ['template.gbx', 'data.js']
});

let source = new Funnel(tree, {
  include: ['data.js', 'src/ui/**/*']
})

const builder = new Builder(templates);

const outputDir = 'dist';
const outputTree = new TreeSync(builder.outputPath, outputDir);
builder.build()
  .then(() => {
    // Calling `sync` will synchronize the contents of the builder's `outPath` with our output directory.
    return outputTree.sync();
  })
  .then(() => {
    // Now that we're done with the build, clean up any temporary files were created
    return builder.cleanup();
  })
  .catch(err => {
    // In case something in this process fails, we still want to ensure that we clean up the temp files
    console.log(err);
  });


 // const { BytecodeLoader } = require('@glimmer/application');
 // console.log(BytecodeLoader)
