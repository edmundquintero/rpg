'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function( grunt ) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',

    jshint: {
      dev: ['src/**/*.js'],
      options: grunt.file.readJSON('.jshintrc')
    },

    concat: {
      js:{
        options: {
          banner: '\'use strict\';\njQuery.noConflict();\n\n(function ($) {\n\n',
          // Replace all 'use strict' statements in the code with a single one at the top
          process: function(src, filepath) {
            return '  // Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1  ');
          },
          footer: '\n})(jQuery);'
        },
        files: {
          'dist/js/rpg.js' : [ 'src/**/*.js' ]
        }
      }
    },

    uglify: {
      min: {
        files: {
          'dist/js/rpg.min.js': [ 'dist/js/rpg.js' ]
        }
      }
    },

    usebanner: {
      build: {
        files: {
          src: [
            'dist/js/rpg.js',
            'dist/js/rpg.min.js'
          ]
        },
        options: {
          position: 'top',
          banner: '<%= banner %>'
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["dist/css"],
          plugins: [
            new (require('less-plugin-autoprefix'))
          ]
        },
        files: {
          "dist/css/main.css": "src/css/main.less"
        }
      },
      production: {
        options: {
          paths: ["dist/css"],
          plugins: [
            new (require('less-plugin-autoprefix')),
            new (require('less-plugin-clean-css'))
          ]
        },
        files: {
          "dist/css/main.min.css": "src/css/main.less"
        }
      }
    },

    copy: {
      main: {
        cwd: '',
        src: ['src/**/*.html'],
        dest: 'dist/templates/',
        expand: true,
        flatten: true,
        filter: 'isFile',
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'concat:js'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      css: {
        files: 'src/**/*.less',
        tasks: ['less:development'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      templates: {
        files: ['src**/*.html'],
        tasks: ['copy:main'],
        options: {
          spawn: false,
          livereload: true,
        },
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: '',
          livereload: true
          // keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask( 'serve', function () {
    var done = this.async();

    fs.exists(path.join(__dirname, '/node_modules/grunt-contrib-connect/'), function (exists) {
      if (exists) {
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.task.run(['dev', 'connect', 'watch']);
      } else {
        grunt.fail.fatal('grunt-contrib-connect is not installed.', [1]);
      }
      done();
    });
  });
 
  grunt.registerTask( 'default', [
    'jshint'
  ]);

  grunt.registerTask( 'dev', [
    'jshint',
    'concat',
    'copy',
    'less:development'
  ]);

  grunt.registerTask( 'build', [
    'jshint',
    'concat',
    'uglify',
    'usebanner',
    'copy',
    'less'
  ]);

};
