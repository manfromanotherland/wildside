module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					style: 'compressed',
				},
				files: {
					'assets/css/main.css': 'assets/scss/main.scss',
				},
			},
		},

		watch: {
			options: {
				livereload: true,
			},
			markup: {
				files: ['index.php'],
			},
			css: {
				files: ['assets/scss/*.scss'],
				tasks: ['sass:dev'],
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['sass', 'watch']);

}