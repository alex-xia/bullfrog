module.exports = function(grunt) {
	var codeFiles = [
		'./*-app.js',
		'lib/**/*.js',
		'test/**/*.js',
		'models/**/*.js',
		'views/**/*.js',
		'controllers/**/*.js'
	];
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    clean: ['build'],
	    exec : {
	        setupDB: 'scripts/test-data-import.sh'
	    },
	    jshint: {
	      files: codeFiles,
	    },
	    mocha_istanbul: {
	      coverage: {
	        src: 'test', // the folder, not the files
	        options: {
	          root: './', // define where the cover task should consider the root of libraries that are covered by tests
	          coverage: true,
	          check: {
	            statements: 55,
	            branches: 50,
	            functions: 55,
	            lines: 74
	          },
	          reportFormats: ['text', 'lcov', 'cobertura'],
	          coverageFolder: 'build/report'
	        }
	      }
	    }
  	});

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-exec');
  
    grunt.registerTask('default', ['clean', 'jshint', 'mocha_istanbul:coverage']);
};