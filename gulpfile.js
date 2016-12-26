var gulp = require('gulp'),
	minify = require('gulp-minify'),
	concat = require('gulp-concat');

gulp.task('default', function() {

})

gulp.task('oneScript', function() {

	gulp.src('src/js/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('src/js/'))
})

gulp.task('mini', function() {
	gulp.src('src/js/script.js')
		.pipe(minify({
			ext: {
				src: '-source.js',
				min: '.js'
			}
		}))
		.pipe(gulp.dest('dist/js'))
})

gulp.task('dist',['oneScript','mini']);