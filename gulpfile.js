'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var gs = require('gulp-selectors');
var livereload = require('gulp-livereload');
var http = require('http');
var st = require('st');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    gulp.src('./src/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload())
    ;
});

gulp.task('sass:watch', ['server'], function () {
    gulp.watch(['./src/css/**/*.scss','./src/css/*.scss'], ['sass']);
    //.pipe(livereload());
});

gulp.task('build', function () {
    gulp.src(['dist/css/*.css', '*.html'])
        .pipe(gs.run())
        .pipe(gulp.dest('dist/css/min'));
});

gulp.task('compress-js', function() {
    return gulp.src(['src/js/*.js', 'src/js/vendor/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('server', function (done) {
    livereload.listen({ basePath: 'dist' });
    http.createServer(
        st({path: __dirname + '/', index: 'index.html', cache: false})
    ).listen(8081, done);
});