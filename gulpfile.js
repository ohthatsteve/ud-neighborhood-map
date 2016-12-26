var gulp = require('gulp'),
	minify = require('gulp-minify');

gulp.task('default', ['mini']);

gulp.task('mini', function() {
	gulp.src('src/js/app.js')
		.pipe(minify({
			ext: {
				src: '-source.js',
				min: '.js'
			}
		}))
		.pipe(gulp.dest('dist/js'))
});