// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

 // Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('assets/js/*.js')
		.pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('css', function(){
    return gulp.src('assets/css/*.css')        
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
		.pipe(minifyCSS())
        .pipe(gulp.dest('build/css'))
});

 // Default Task
gulp.task('default', ['scripts','css']);
