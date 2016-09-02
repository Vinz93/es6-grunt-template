module.exports = function (grunt) {
require('load-grunt-tasks')(grunt);

var paths = {
  pkg: 'package.json',
  src: {
    main: 'index.js',
  js:[
    'config/**/*.js',
    'server/routes/**/*.js',
    'server/controllers/**/*.js',
    'server/models/**/*.js',
  ]
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
        paths.src.main,
        paths.src.js
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
watch: {
      src: {
        files: [
          paths.src.main,
          paths.src.js
        ],
        tasks: ['changed:babel'],
        options: {
          spawn: false,
        },
      }
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
concurrent: {
  js: {
    tasks: [
      'nodemon',
      'watch:src'
    ],
    options: {
      logConcurrentOutput: true,
      limit: 2
    },
  },
}
});

  grunt.registerTask('build',[
    'clean',
    'changed:babel',
    'copy:pkg'
  ]);

  grunt.registerTask('serve',[
    'clean',
    'changed:babel',
    'concurrent'
  ]);
  grunt.registerTask('default', 'serve');
};

/** =========== Readme ================

Its more cleaner load all grunt pluings in one line,
with the following line of code.

require('load-grunt-tasks')(grunt);

=== "grunt-changed": "^1.0.0"===

this plugins Configure Grunt tasks
to run with changed file contents only.

example : 'changed:babel'


======= nodemon ==========
 is a utility that will monitor for any changes
 in your source and automatically restart your server.

 nodemon: {
   dist: {
     script: paths.src.main,
     options: {
       cwd: paths.dist,
       nodeArgs: ['--harmony_proxies'],
     },
   },
 }

 script: Script that nodemon
 runs and restarts when changes are detected.

 cwd: The current working directory to run your script from.






**/
