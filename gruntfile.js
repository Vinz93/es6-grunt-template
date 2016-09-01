module.exports = function (grunt) {
require('load-grunt-tasks')(grunt);

var paths = {
  pkg: 'package.json',
  src: {
    main: 'index.js'
  },
  dist: 'dist/'
};

grunt.initConfig({
  babel: {
  options: {
    sourceMap: true,
    presets: ['es2015'],
  },
  src: {
    files: [{
      expand: true,
      src: [
        paths.src.main
      ],
      dest: paths.dist,
      ext: '.js',
    }],
  },
},
clean: {
  dist:{
    src: paths.dist
  }
},
copy: {
  pkg: {
      files: [{
        src: paths.pkg,
        dest: paths.dist
      }],
    },
},
nodemon: {
  dist: {
    script: paths.src.main,
    options: {
      cwd: paths.dist,
      nodeArgs: ['--harmony_proxies'],
    },
  },
},
});

  grunt.registerTask('build',[
    'clean',
    'changed:babel',
    'copy:pkg',
  ]);

  grunt.registerTask('serve',[
    'clean',
    'changed:babel'
  ]);
  grunt.registerTask('default', 'serve');
};

/** Readme
Its more cleaner load all grunt pluings in one line,
with the following line of code.

require('load-grunt-tasks')(grunt);

"grunt-changed": "^1.0.0"

this plugins Configure Grunt tasks
to run with changed file contents only.

example : 'changed:babel'




*/
