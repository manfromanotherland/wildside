module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true,
				},
				files: {
					'assets/css/main.css': 'assets/scss/main.scss',
				},
			},
		},

		postcss: {
			options: {
				processors: require('autoprefixer-core')({browsers: 'last 2 versions'}),
			},
			dist: {
				src: 'assets/css/*.css',
			},
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
			},
			all: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/*.min.js'],
		},

		uglify: {
			dist: {
				files: {
					'assets/js/main.min.js': ['assets/js/main.js'],
				},
			},
		},

		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['assets/css/*.css', '**/*.php', '**/*.js'],
			},
			markup: {
				files: ['**/*.php'],
			},
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'postcss'],
			},
			scripts: {
				files: ['**/*.js', '!assets/js/main.min.js'],
				tasks: ['jshint', 'uglify'],
			},
		},

	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'postcss', 'jshint', 'uglify', 'watch']);

};