'use strict';

module.exports = function (grunt) {
  // Load all Grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-bower-concat');

  // Load Bower dependencies
  var dependencies = require('wiredep')();

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      bower: {
        files: ['bower.json']
      , tasks: ['wiredep']
      }
    , js: {
        files: ['js/src/**/*.js']
      , tasks: ['jshint', 'concat', 'bower_concat']
      }
    , gruntfile: {
        files: ['Gruntfile.js']
      }
    , less: {
        files: ['less/**/*.less']
      , tasks: ['less', 'autoprefixer', 'csslint']
      }
    , livereload: {
        options: {
          livereload: true
        }
      , files: [
          'design/**/*.css'
        , 'design/images/**/*'
        , 'js/**/*.js'
        , 'views/**/*.tpl'
        ]
      }
    },

    less: {
      dist: {
        options: {
          strictMath: true
        , sourceMap: true
        , sourceMapURL: 'custom.css.map'
        , sourceMapFilename: 'design/custom.css.map'
        }
      , files: [{
          expand: true
        , cwd: 'less/'
        , src: ['*.less']
        , dest: 'design/'
        , ext: '.css'
       }]
      }
    },

    autoprefixer: {
      dist: {
        src: ['design/**/*.css']
      }
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      }
    , all: ['js/src/**/*.js']
    },

    csslint: {
      options: {
        csslintrc: 'design/.csslintrc'
      }
    , all: ['design/custom.css']
    },

    bower_concat: {
      all: {
        dest: 'js/bower_components.js',
        exclude: [
          'jquery'
        ],
        bowerOptions: {
          relative: false
        }
      }
    },

    concat: {
       dist: {
         src: (['js/bower_components.js']).concat([
           'js/src/main.js'
         ])
       , dest: 'js/customdashboard.js'
       }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'design/images',
          src: '**/*.{gif,jpeg,jpg,png,svg}',
          dest: 'design/images'
        }]
      }
    },

    wiredep: {
      dist: {
        src: ['less/**/*.less']
      }
    }

  });

  grunt.registerTask('default', [
    'wiredep'
  , 'less'
  , 'autoprefixer'
  , 'bower_concat'
  , 'concat'
  , 'jshint'
  , 'csslint'
  , 'imagemin'
  ]);
};
