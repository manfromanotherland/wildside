'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Task for serving blog with Browsersync
gulp.task('serve', function () {
	browserSync.init({server: {baseDir: '_site/'}});
	// Reloads page when some of the already built files changed:
	gulp.watch('assets/scss/**/*.scss', ['styles']);
	gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Compile sass into CSS and run autoprefixer
gulp.task('styles', function() {
	return gulp.src('assets/scss/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 2 versions', '> 2%'))
		.pipe(gulp.dest('_site/assets/css/'))
		.pipe(browserSync.stream());
});

// Task for building blog when something changed
gulp.task('build', shell.task(['jekyll serve --baseurl ""']));

// Task for deploy the website
gulp.task('deploy', shell.task(['jekyll build && rsync -vrzc --delete _site/ edmundojr:www/wildside']));

// Default task
gulp.task('default', ['build', 'serve']);