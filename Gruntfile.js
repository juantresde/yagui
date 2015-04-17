module.exports = function (grunt) {
  'use strict';

  var clean = ['build'];

  var jshint = {
    files: ['Gruntfile.js', 'src/**/*.js']
  };

  var requirejs = {
    debug: {
      options: {
        preserveLicenseComments: false,
        wrap: {
          start: '(function() {',
          end: 'return require("yagui");}());'
        },
        optimize: 'none',
        baseUrl: 'src',
        name: '../tools/almond',
        include: 'yagui',
        out: 'build/yagui.js'
      }
    },
    min: {
      options: {
        preserveLicenseComments: false,
        wrap: {
          start: '(function() {',
          end: 'return require("yagui");}());'
        },
        optimize: 'uglify2',
        baseUrl: 'src',
        name: '../tools/almond',
        include: 'yagui',
        out: 'build/yagui.min.js'
      }
    }
  };

  var copy = {
    main: {
      files: [{
        expand: true,
        flatten: true,
        src: ['css/*'],
        dest: 'build/',
        filter: 'isFile'
      }]
    }
  };

  var watch = {
    src: {
      files: [
        'src/**/*.js',
        'css/*'
      ],
      tasks: ['buildsources']
    }
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: requirejs,
    jshint: jshint,
    clean: clean,
    copy: copy,
    watch: watch
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', 'jshint');
  grunt.registerTask('buildsources', ['copy', 'requirejs:debug', 'requirejs:min']);
  grunt.registerTask('build', ['clean', 'jshint', 'buildsources']);

  grunt.registerTask('default', 'build');
};