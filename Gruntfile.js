'use strict';

module.exports = function (grunt) {

	// Load all Grunt tasks that are listed in package.json
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// shell commands for use in Grunt tasks
		shell: {
			jekyllBuild: {
				command: 'jekyll build && rsync -vrzc --delete _site/ edmundojr:www/wildside',
			},
			jekyllServe: {
				command: 'jekyll serve --baseurl ""',
			},
		},

		// sass (libsass) config
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true,
				},
				files: {
					'_site/assets/css/main.css': 'assets/scss/main.scss',
				},
			},
		},

		postcss: {
			options: {
				processors: require('autoprefixer-core')({browsers: 'last 2 versions'}),
			},
			dist: {
				src: '_site/assets/css/main.css',
			},
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				node: true,
			},
			all: ['Gruntfile.js', 'assets/js/*.js', '!assets/js/*.min.js'],
		},

		uglify: {
			dist: {
				files: {
					'assets/js/main.min.js': [
						'assets/js/libs/smooth-scroll.min.js',
						'assets/js/libs/photoswipe.min.js',
						'assets/js/libs/photoswipe-ui-default.min.js',
						'assets/js/main.js'
					],
				},
			},
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}],
			},
		},

		// watch for files to change and run tasks when they do
		watch: {
			livereload: {
				files: [
					'_config.yml',
					'assets/**',
					'index.html',
					'about.md',
					'_layouts/**',
					'_includes/**',
					'_posts/**'],
				options: {
					livereload: true
				},
			},
			styles: {
				files: ['**/*.scss'],
				tasks: ['sass', 'postcss'],
			},
			scrips: {
				files: ['assets/js/main.js'],
				tasks: ['jshint', 'uglify'],
			},
		},

		// run tasks in parallel
		concurrent: {
			serve: ['sass', 'postcss', 'jshint', 'uglify', 'watch', 'shell:jekyllServe'],
			options: {
				logConcurrentOutput: true,
			},
		},

	});

	// Register the grunt serve task
	grunt.registerTask('serve', ['concurrent:serve']);

	// Register the grunt build task
	grunt.registerTask('deploy', ['sass', 'postcss', 'uglify', 'imagemin', 'shell:jekyllBuild']);

	// Register build as the default task fallback
	grunt.registerTask('default', 'build');

};